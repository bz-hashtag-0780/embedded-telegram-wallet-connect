'use client';

import { useAuth } from '@/context/AuthContext';

export default function Home() {
	const { user, logIn, logOut } = useAuth();

	return (
		<div className="page-container">
			<div className="card">
				<h1 className="card-title">Connect UXUY Wallet</h1>
				<p className="card-subtitle">
					Connect your Telegram wallet to get started
				</p>

				{user ? (
					<div className="space-y-4">
						<p className="connected-text">
							Connected as:{' '}
							<span className="connected-username">
								${user.slice(0, 6)}...${user.slice(-6)}
							</span>
						</p>
						<button
							onClick={logOut}
							className="button button-disconnect"
						>
							Disconnect Wallet
						</button>
					</div>
				) : (
					<button onClick={logIn} className="button button-connect">
						Connect Wallet
					</button>
				)}
			</div>
		</div>
	);
}
