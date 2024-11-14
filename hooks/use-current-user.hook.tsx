/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';

export default function useCurrentUser() {
	const [userAddr, setUserAddr] = useState(null);
	const [chainId, setChainId] = useState(null);
	const [walletSdk, setWalletSdk] = useState<any>(null);
	const DEFAULT_CHAIN_ID = '0x747'; // Flow EVM Mainnet: 747 Flow EVM Testnet: 545

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

	const logIn = async () => {
		try {
			const accounts = await walletSdk.ethereum.request({
				method: 'eth_requestAccounts',
			});
			setUserAddr(accounts[0]);
			const chainId = await walletSdk.ethereum.request({
				method: 'eth_chainId',
				params: [],
			});
			setChainId(chainId);
			switchChain(DEFAULT_CHAIN_ID);
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
		} catch (error) {
			console.error('Chain switch failed:', error);
		}
	};

	return [userAddr, chainId, logIn, logOut];
}
