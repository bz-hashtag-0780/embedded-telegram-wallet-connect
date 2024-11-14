/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';

export const TESTNET_PARAMS = {
	chainId: '0x545',
	chainName: 'Flow',
	rpcUrls: ['https://testnet.evm.nodes.onflow.org'],
	nativeCurrency: {
		name: 'Flow',
		symbol: 'FLOW',
		decimals: 18,
	},
	blockExplorerUrls: ['https://evm-testnet.flowscan.io/'],
};

export const MAINNET_PARAMS = {
	chainId: '0x747',
	chainName: 'Flow',
	rpcUrls: ['https://mainnet.evm.nodes.onflow.org'],
	nativeCurrency: {
		name: 'Flow',
		symbol: 'FLOW',
		decimals: 18,
	},
	blockExplorerUrls: ['https://evm.flowscan.io/'],
};

export default function useCurrentUser() {
	const [userAddr, setUserAddr] = useState(null);
	const [chainId, setChainId] = useState<any>(null);
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

	// const switchChain = async (chainId: any) => {
	// 	try {
	// 		await walletSdk.ethereum.request({
	// 			method: 'wallet_switchEthereumChain',
	// 			params: [{ chainId: chainId }],
	// 		});
	// 		setChainId(chainId);
	// 		alert('Chain switch succeeded:');
	// 	} catch (error) {
	// 		console.error('Chain switch failed:', error);
	// 		alert('Chain switch failed');
	// 	}
	// };

	const switchChain = async (chainId: any) => {
		try {
			await walletSdk.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: chainId }],
			});
			setChainId(chainId);
			alert('Chain switch succeeded');
		} catch (error: any) {
			if (error.code === 4902) {
				// 4902 indicates the chain has not been added
				try {
					await walletSdk.ethereum.request({
						method: 'wallet_addEthereumChain',
						params: [MAINNET_PARAMS], // Or TESTNET_PARAMS for testnet
					});
					setChainId(chainId);
					alert('Flow EVM successfully added and switched');
				} catch (addError) {
					console.error('Adding Flow EVM failed:', addError);
					alert('Flow EVM could not be added and switched');
				}
			} else {
				console.error('Chain switch failed:', error);
			}
		}
	};

	return [userAddr, chainId, logIn, logOut];
}
