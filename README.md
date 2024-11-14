# Connect a Telegram Embedded Wallet UXUY on Flow EVM

This repository provides a quickstart guide to connect a UXUY wallet—a Telegram Embedded Wallet—and add the Flow EVM network. Connecting a wallet is essential for secure transactions and interacting with dApps on Flow.

Follow along with the **[tutorial here](https://www.notion.so/Connect-a-Telegram-Embedded-Wallet-UXUY-on-Flow-EVM-13e1aee12324809c800fda6c3186d10e)** for a step-by-step guide. This setup supports connecting a wallet directly within Telegram on Flow EVM.

For more on connecting a wallet in the Flow Cadence environment, check out the **[Wallet Guide for Flow Cadence](https://flowfoundation.notion.site/Connect-a-Wallet-on-Flow-Blockchain-Cadence-Environment-13e1aee1232480e59f74ef956f6a1ddd)**.

## Overview

This example includes:
- Setting up a **Next.js project** with **TypeScript** and **App Router**
- Configuring the Flow EVM network for mainnet/testnet
- Custom hooks and contexts for user authentication with UXUY wallet
- A sample wallet connection interface within a Telegram Web App (TWA)

## Quickstart

Clone the repository or use it as a reference:

[GitHub Repository](https://github.com/bz-hashtag-0780/embedded-telegram-wallet-connect) | [Live Demo](http://t.me/FlowTelegramTestBot/embeddedwallet)

## Getting Started

1. **Set Up Next.js with TypeScript**:
   ```bash
   npx create-next-app@latest my-app --typescript
   cd my-app
   npm install @uxuycom/web3-tg-sdk
   ```

2. **Flow EVM Configuration**:
   In `use-current-user.hook.tsx`, configure mainnet/testnet parameters, set up your wallet SDK, and handle authentication events.

3. **Authentication Hook**:
   Use the `useCurrentUser` hook for logging in and out of UXUY wallets and switching between Flow EVM mainnet and testnet.

4. **Auth Context Setup**:
   Create `AuthContext.tsx` to manage wallet connection state globally across components.

5. **UI Setup**:
   Add a simple connect/disconnect button in your main `page.tsx`.

6. **Optional Styling**:
   Use Tailwind CSS or custom styling for a clean UI.

## Conclusion

By following these steps, you’ll have a Next.js Telegram Web App that enables wallet connection with UXUY, allowing users to interact with Flow EVM in Telegram.

For further details, please refer to the **[tutorial on Notion](https://www.notion.so/Connect-a-Telegram-Embedded-Wallet-UXUY-on-Flow-EVM-13e1aee12324809c800fda6c3186d10e)**.
