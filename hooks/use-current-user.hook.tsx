/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';

export default function useCurrentUser() {
	const [user, setUser] = useState(null);
	const [walletSdk, setWalletSdk] = useState<any>(null);

	useEffect(() => {
		// Only initialize the SDK on the client
		if (typeof window !== 'undefined') {
			const { WalletTgSdk } = require('@uxuycom/web3-tg-sdk');
			const sdk = new WalletTgSdk();
			setWalletSdk(sdk);

			sdk.ethereum.on('accountsChanged', (accounts: any) => {
				setUser(accounts[0] || null);
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
			setUser(accounts[0]);
		} catch (error) {
			console.error('Failed to connect wallet:', error);
		}
	};

	const logOut = () => {
		walletSdk.ethereum.disconnect();
		setUser(null);
	};

	return [user, logIn, logOut];
}
