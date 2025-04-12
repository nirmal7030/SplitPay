# SplitPay DApp - Decentralized Expense Splitter

## Overview

SplitPay is a Web3 enabled decentralized application (DApp) built on the Ethereum Sepolia test network. It allows groups of users to track shared expenses and settle debts directly between their wallets using a custom ERC20 token (SPT), leveraging the transparency and security of blockchain technology. The application uses MetaMask for wallet connection and transaction signing, features a Node.js/Express backend to serve the frontend, and integrates third-party APIs for enhanced usability.

## Functionality Implemented

The DApp currently supports the following core functionalities:

1.  **Web3 Wallet Connection (Login):**
    *   Users connect their MetaMask wallet to interact with the application.
    *   The DApp identifies the user's connected account address.
    *   It verifies that the user is connected to the correct network (Sepolia Testnet - Chain ID 11155111).
    *   Handles account switching and network changes initiated via MetaMask.

2.  **Smart Contract Interaction:**
    *   The frontend communicates directly with two deployed smart contracts on the Sepolia network:
        *   **SplitterToken:** An ERC20 token contract for the SPT currency.
        *   **SplitterContract:** The main contract managing groups, expenses, balances, and settlement logic.
    *   Interaction is handled via the Web3.js library running in the user's browser.

3.  **Group Creation:**
    *   Connected users can create new expense-sharing groups.
    *   They specify the initial members (by address); the creator is automatically included.
    *   The group is created on-chain via a transaction to the `SplitterContract`.

4.  **Expense Addition & Tracking:**
    *   Users can add expenses to a specific group they are members of.
    *   They specify the description, total amount (in SPT), the payer's address, and the participant addresses involved in the expense.
    *   The `SplitterContract` automatically calculates the share per participant and updates the internal balances (`int256`) for all involved members.

5.  **Balance Viewing:**
    *   Users can view the members and their current net balances (positive if owed money by the group pool, negative if owing money to the group pool) for a specific Group ID.
    *   Balances are displayed in SPT tokens.

6.  **Debt Settlement (Sending/Receiving Funds):**
    *   A user who owes money (negative balance) can settle their debt with a specific creditor (positive balance) within the same group.
    *   This involves a two-step transaction process initiated by the debtor:
        *   **Approve:** The debtor sends a transaction to the `SplitterToken` contract, approving the `SplitterContract` address to spend the required amount of SPT from their wallet.
        *   **Settle:** The debtor sends a transaction to the `SplitterContract`'s `settleDebt` function, specifying the group, creditor, and amount. The contract verifies the balances and allowance, then calls `transferFrom` on the `SplitterToken` contract to move the SPT tokens from the debtor to the creditor, finally updating the internal balances.

7.  **API Integrations:**
    *   **CoinGecko API:** Fetches the current price of Ethereum (ETH) in USD to provide an estimated fiat value context for gas fees paid in SepoliaETH.
    *   **Etherscan Links:** Dynamically generates and displays clickable links to the Sepolia Etherscan block explorer for the deployed smart contracts and for each successful transaction hash, allowing users to easily view on-chain details.

## Technology Stack

*   **Blockchain:** Ethereum Sepolia Test Network
*   **Smart Contracts:** Solidity (`^0.8.20`)
*   **Token Standard:** ERC20 (Custom Implementation)
*   **Wallet:** MetaMask
*   **Web3 Library:** Web3.js (loaded via CDN in frontend)
*   **Backend:** Node.js, Express.js
*   **Frontend:** EJS (Templating), HTML, CSS, JavaScript (`public/javascripts/app.js`)
*   **Contract Development:** Remix IDE
*   **Deployment:** AWS Elastic Beanstalk (EBS)
*   **APIs:** CoinGecko (Price), Etherscan (Links)

## Prerequisites

*   **Node.js & npm:** Required for running the Express backend locally. (Download from [nodejs.org](https://nodejs.org/))
*   **MetaMask:** Browser extension wallet installed. (Download from [metamask.io](https://metamask.io/))
*   **Sepolia Test ETH:** Required in your MetaMask account for paying transaction gas fees. (Get from a Sepolia Faucet like [sepoliafaucet.com](https://sepoliafaucet.com/) or others).
*   **SPT Tokens:** The custom `SplitterToken`. The deployer account receives the initial supply and needs to transfer SPT tokens to other test accounts using Remix or a transfer function.

## Setup & Installation (Local)

1.  **Clone the Repository:**
    ```bash
    git clone <your-repository-url>
    cd Splitpay # Or your project directory name
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Contract Addresses:**
    *   Open the file `public/javascripts/app.js`.
    *   Ensure the `splitterTokenAddress` and `splitterContractAddress` constants at the top match the addresses of your contracts currently deployed on Sepolia:
        ```javascript
        const splitterTokenAddress = "0x007f73Bb529526e5C70c03Ad67408cbdE486C820"; // Replace if different
        const splitterContractAddress = "0x7d96e71f28Ea3B1287918c2627B8Fe7840d9905E"; // Replace if different
        ```
4.  **Ensure Contracts are Deployed:** Verify that the contracts at the addresses specified above are deployed on the Sepolia network and match the code used in the project.

## Running the Application (Local)

1.  **Start the Server:**
    ```bash
    npm start
    ```
2.  **Access the DApp:** Open your web browser and navigate to `http://localhost:3000`.
3.  **Connect MetaMask:** Ensure MetaMask is installed, unlocked, and set to the Sepolia Test Network. Click "Connect Wallet" in the DApp.
4.  **Interact:** Use the navigation bar and forms to create groups, add expenses, view balances, and settle debts.

## Smart Contract Details (Sepolia)

*   **SplitterToken (SPT):** [`0x007f73Bb529526e5C70c03Ad67408cbdE486C820`](https://sepolia.etherscan.io/address/0x007f73Bb529526e5C70c03Ad67408cbdE486C820)
*   **SplitterContract:** [`0x7d96e71f28Ea3B1287918c2627B8Fe7840d9905E`](https://sepolia.etherscan.io/address/0x7d96e71f28Ea3B1287918c2627B8Fe7840d9905E)

*(Note: Replace links if using different addresses)*

## API Integrations

*   **CoinGecko:** Used via a simple `fetch` request in `app.js` to get the ETH/USD price for displaying estimated gas costs. No API key required for this usage.
*   **Etherscan:** Links are dynamically generated in `app.js` based on deployed contract addresses and transaction hashes returned in receipts. These links allow users to view details directly on the Sepolia block explorer.

## Deployment

The application is deployed on AWS Elastic Beanstalk. HTTPS was configured by:
1.  Using a custom domain name.
2.  Provisioning a free SSL/TLS certificate via AWS Certificate Manager (ACM) using DNS validation.
3.  Configuring the environment's Elastic Load Balancer (ELB) to use a listener on port 443 (HTTPS) with the ACM certificate, forwarding traffic to the application instance on port 80 (HTTP).
4.  Updating DNS records (CNAME or Alias) to point the custom domain to the ELB's DNS name.


## Limitations & Future Improvements

*   **Group Discovery:** The current "View Groups" requires users to know and enter a Group ID. Implementing automatic discovery of groups a user belongs to (via event indexing or off-chain storage) would significantly improve usability.
*   **User Experience:** Further UI/UX refinements could include ENS name resolution, better loading state indicators, and more integrated settlement options within the group view.
*   **Event Listening:** While events are emitted by the contracts, the frontend doesn't actively listen for them to update the UI automatically (relies on manual refreshes/fetches).

## License

This project is licensed under the MIT License.
