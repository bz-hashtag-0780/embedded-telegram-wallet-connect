/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { WalletTgSdk } from '@uxuycom/web3-tg-sdk';

export default function useCurrentUser() {
	const { ethereum } = new WalletTgSdk();
	const [user, setUser] = useState<any>(null);

	const logIn = async () => {
		try {
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});
			setUser(accounts[0]);
		} catch (error) {
			console.error('Failed to connect wallet:', error);
		}
	};

	const logOut = () => {
		ethereum.disconnect();
		setUser(null); // Simply resets user state
	};

	useEffect(() => {
		ethereum.on('accountsChanged', (accounts) => {
			setUser(accounts[0] || null);
		});

		return () => {
			ethereum.removeAllListeners();
		};
	}, []);

	return [user, logIn, logOut];
}
