/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';

export default function useCurrentUser() {
	const [userAddr, setUserAddr] = useState(null);
	const [chainId, setChainId] = useState<any>(null);
	const [walletSdk, setWalletSdk] = useState<any>(null);
	const DEFAULT_CHAIN_ID = '0x89'; // Flow EVM Mainnet: 747 Flow EVM Testnet: 545

	useEffect(() => {
		// Only initialize the SDK on the client
		if (typeof window !== 'undefined') {
			const { WalletTgSdk } = require('@uxuycom/web3-tg-sdk');
			const sdk = new WalletTgSdk();
			setWalletSdk(sdk);

			sdk.ethereum.on('accountsChanged', (accounts: any) => {
				setUserAddr(accounts[0] || null);
			});
		}

		return () => {
			if (walletSdk) {
				walletSdk.ethereum.removeAllListeners();
			}
		};
	}, []);

	function initEventListener() {
		// events
		walletSdk.ethereum.removeAllListeners();
		function handleAccountsChanged(accounts: any) {
			setUserAddr(accounts[0]);
		}
		function handleChainChanged(_chainId: any) {
			setChainId('0x' + Number(_chainId).toString(16));
		}

		walletSdk.ethereum.on('accountsChanged', handleAccountsChanged);
		walletSdk.ethereum.on('chainChanged', handleChainChanged);
	}

	const logIn = async () => {
		try {
			const accounts = await walletSdk.ethereum.request({
				method: 'eth_requestAccounts',
			});

			const chainId = await walletSdk.ethereum.request({
				method: 'eth_chainId',
				params: [],
			});
			const isConnected = accounts[0];
			setUserAddr(accounts[0]);
			setChainId(chainId);
			initEventListener();
			isConnected && switchChain(DEFAULT_CHAIN_ID);
		} catch (error) {
			console.error('Failed to connect wallet:', error);
		}
	};

	const logOut = () => {
		walletSdk.ethereum.disconnect();
		setUserAddr(null);
	};

	const switchChain = async (chainId: any) => {
		try {
			await walletSdk.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: chainId }],
			});
			setChainId(chainId);
			alert('Chain switch succeeded:');
		} catch (error) {
			console.error('Chain switch failed:', error);
			alert('Chain switch failed:');
		}
	};

	return [userAddr, chainId, logIn, logOut];
}
