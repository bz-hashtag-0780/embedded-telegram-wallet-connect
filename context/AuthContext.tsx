/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { createContext, useContext } from 'react';
import useCurrentUser from '@/hooks/use-current-user.hook';

interface AuthContextType {
	userAddr: any;
	chainId: any;
	logIn: any;
	logOut: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [userAddr, chainId, logIn, logOut] = useCurrentUser();

	return (
		<AuthContext.Provider value={{ userAddr, chainId, logIn, logOut }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthContextProvider');
	}
	return context;
};
