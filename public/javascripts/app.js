// --- Configuration ---
const splitterTokenAddress = "0x007f73Bb529526e5C70c03Ad67408cbdE486C820";
const splitterContractAddress = "0x7d96e71f28Ea3B1287918c2627B8Fe7840d9905E";
const SEPOLIA_CHAIN_ID = '11155111';
const tokenDecimals = 18; // Assuming 18 decimals for SPT

// --- Hardcoded ABIs ---
const splitterTokenABI = [ { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" } ];
const splitterContractABI = [ { "inputs": [ { "internalType": "address", "name": "_tokenAddress", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "AddressZero", "type": "error" }, { "inputs": [], "name": "AmountExceedsCredit", "type": "error" }, { "inputs": [], "name": "AmountExceedsDebt", "type": "error" }, { "inputs": [], "name": "AmountNotEvenlyDivisible", "type": "error" }, { "inputs": [], "name": "CannotSettleWithSelf", "type": "error" }, { "inputs": [], "name": "CreditorOwedNoMoney", "type": "error" }, { "inputs": [], "name": "DebtorOwesNoMoney", "type": "error" }, { "inputs": [], "name": "GroupMustHaveMembers", "type": "error" }, { "inputs": [ { "internalType": "uint256", "name": "allowance", "type": "uint256" }, { "internalType": "uint256", "name": "required", "type": "uint256" } ], "name": "InsufficientAllowance", "type": "error" }, { "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "InvalidAmount", "type": "error" }, { "inputs": [ { "internalType": "uint256", "name": "participantsLength", "type": "uint256" } ], "name": "InvalidNumberOfParticipants", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "member", "type": "address" } ], "name": "MemberAlreadyInGroup", "type": "error" }, { "inputs": [ { "internalType": "uint256", "name": "groupId", "type": "uint256" }, { "internalType": "address", "name": "user", "type": "address" } ], "name": "NotGroupMember", "type": "error" }, { "inputs": [], "name": "TransferFailed", "type": "error" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "groupId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "debtor", "type": "address" }, { "indexed": true, "internalType": "address", "name": "creditor", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "DebtSettled", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "groupId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "payer", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "totalAmount", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "description", "type": "string" }, { "indexed": false, "internalType": "address[]", "name": "participants", "type": "address[]" }, { "indexed": false, "internalType": "uint256", "name": "amountPerParticipant", "type": "uint256" } ], "name": "ExpenseAdded", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "groupId", "type": "uint256" }, { "indexed": false, "internalType": "address[]", "name": "members", "type": "address[]" } ], "name": "GroupCreated", "type": "event" }, { "inputs": [ { "internalType": "uint256", "name": "_groupId", "type": "uint256" }, { "internalType": "string", "name": "_description", "type": "string" }, { "internalType": "uint256", "name": "_totalAmount", "type": "uint256" }, { "internalType": "address", "name": "_payer", "type": "address" }, { "internalType": "address[]", "name": "_participants", "type": "address[]" } ], "name": "addExpense", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" } ], "name": "balances", "outputs": [ { "internalType": "int256", "name": "", "type": "int256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address[]", "name": "_initialMembers", "type": "address[]" } ], "name": "createGroup", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_groupId", "type": "uint256" } ], "name": "getGroupMembers", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_groupId", "type": "uint256" }, { "internalType": "address", "name": "_member", "type": "address" } ], "name": "getMemberBalance", "outputs": [ { "internalType": "int256", "name": "", "type": "int256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "groups", "outputs": [ { "internalType": "uint256", "name": "id", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nextGroupId", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_groupId", "type": "uint256" }, { "internalType": "address", "name": "_creditor", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "settleDebt", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "token", "outputs": [ { "internalType": "contract IERC20", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" } ];

// --- Global Variables ---
let web3;
let userAccount = null;
let tokenContractInstance = null;
let splitterContractInstance = null;
let ethPriceUSD = null;
let lastPriceUpdate = null;

// --- DOM Elements ---
const connectButton = document.getElementById('connectButton');
const statusSpan = document.getElementById('status');
const accountSpan = document.getElementById('account');
const chainIdSpan = document.getElementById('chainId');
const tokenAddressLink = document.getElementById('tokenAddressLink');
const contractAddressLink = document.getElementById('contractAddressLink');
const connectionDetailsDiv = document.getElementById('connection-details');
const connectionStatusShortSpan = document.getElementById('connection-status-short');
const appContentDiv = document.getElementById('app-content');
const navLinks = document.querySelectorAll('.nav-link');
const createGroupSection = document.getElementById('create-group-section');
const addExpenseSection = document.getElementById('add-expense-section');
const viewGroupsSection = document.getElementById('view-groups-section');
const settleDebtSection = document.getElementById('settle-debt-section');
const allSections = document.querySelectorAll('.app-section');
const createGroupForm = document.getElementById('createGroupForm');
const addExpenseForm = document.getElementById('addExpenseForm');
const settleDebtForm = document.getElementById('settleDebtForm');
const viewGroupIdInput = document.getElementById('viewGroupIdInput');
const fetchGroupDetailsButton = document.getElementById('fetchGroupDetailsButton');
const ethPriceUsdSpan = document.getElementById('eth-price-usd');
const ethPriceUpdateTimeSpan = document.getElementById('eth-price-update-time');

// --- Initialization ---
window.addEventListener('load', async () => {
    // Set link href and text for token and contract addresses
    if (tokenAddressLink) {
        tokenAddressLink.textContent = splitterTokenAddress;
        tokenAddressLink.href = `https://sepolia.etherscan.io/address/${splitterTokenAddress}`;
    }
    if (contractAddressLink) {
        contractAddressLink.textContent = splitterContractAddress;
        contractAddressLink.href = `https://sepolia.etherscan.io/address/${splitterContractAddress}`;
    }

    // Add event listener to the connect button
    connectButton.addEventListener('click', connectWallet);

    // Setup Navigation
    setupNavigation();

    // Setup Form Listeners
    setupFormListeners();

    // Check MetaMask connection state
    if (window.ethereum) {
         if (window.ethereum.selectedAddress) {
             console.log("MetaMask has selected address, attempting connection.");
             await connectWallet();
         }
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
    } else {
        updateConnectionStatus(false, 'MetaMask not detected');
        alert('Please install MetaMask to use this DApp!');
    }

    // Fetch ETH price on load and set up periodic updates
    await fetchEthPrice();
    setInterval(fetchEthPrice, 60000); // Update every minute

    console.log("App initialized with Token:", splitterTokenAddress, "Splitter:", splitterContractAddress);
});

// --- ETH Price API Functions ---
async function fetchEthPrice() {
    console.log("Fetching ETH price from CoinGecko...");
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        if (!response.ok) {
            throw new Error(`CoinGecko API request failed: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.ethereum && data.ethereum.usd) {
            ethPriceUSD = data.ethereum.usd;
            lastPriceUpdate = new Date();
            console.log("Fetched ETH Price (USD):", ethPriceUSD);
            updateEthPriceDisplay();
            return ethPriceUSD;
        } else {
            throw new Error("Invalid data format received from CoinGecko");
        }
    } catch (error) {
        console.error("Error fetching ETH price:", error);
        return null;
    }
}

function updateEthPriceDisplay() {
    if (ethPriceUSD && lastPriceUpdate) {
        const formattedPrice = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(ethPriceUSD);
        
        ethPriceUsdSpan.textContent = formattedPrice;
        
        const updateTime = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(lastPriceUpdate);
        
        ethPriceUpdateTimeSpan.textContent = `(Updated: ${updateTime})`;
    } else {
        ethPriceUsdSpan.textContent = 'Price unavailable';
        ethPriceUpdateTimeSpan.textContent = '';
    }
}

async function calculateAndFormatGasCost(receipt) {
    if (!receipt || !receipt.gasUsed || !receipt.effectiveGasPrice) {
        return ''; // Not enough info
    }

    const gasUsed = BigInt(receipt.gasUsed);
    const effectiveGasPrice = BigInt(receipt.effectiveGasPrice);
    const gasCostWei = gasUsed * effectiveGasPrice;
    const gasCostETH = web3.utils.fromWei(gasCostWei.toString(), 'ether');

    // Fetch the current ETH price
    const price = await fetchEthPrice();
    if (price === null) {
        return ` | Gas Cost: ${parseFloat(gasCostETH).toFixed(6)} SepoliaETH (USD Price N/A)`;
    }

    const gasCostUSD = parseFloat(gasCostETH) * price;

    return ` | Gas Cost: ${parseFloat(gasCostETH).toFixed(6)} SepoliaETH (~$${gasCostUSD.toFixed(2)} USD*)
            <br><small style="margin-left: 10px;">*USD estimate based on mainnet ETH price.</small>`;
}

// --- Core Web3 Functions ---
async function connectWallet() {
    updateConnectionStatus(null, 'Connecting...');

    if (typeof window.ethereum === 'undefined') {
         updateConnectionStatus(false, 'MetaMask not detected');
        return alert('Please install MetaMask!');
    }

    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        handleAccountsChanged(accounts);

    } catch (error) {
        console.error('Wallet connection failed:', error);
        if (error.code === 4001) {
            updateConnectionStatus(false, 'Connection rejected');
            alert('You rejected the wallet connection request.');
        } else {
            updateConnectionStatus(false, 'Connection Failed');
            alert(`Wallet connection failed: ${error.message || 'Unknown error'}`);
        }
         resetAppState();
    }
}

async function initializeContracts() {
    if (!web3 || !userAccount || splitterTokenABI.length === 0 || splitterContractABI.length === 0) {
        console.error("Cannot initialize contracts. Web3/Account/ABIs missing.");
        tokenContractInstance = null;
        splitterContractInstance = null;
        return false;
    }
    try {
        tokenContractInstance = new web3.eth.Contract(splitterTokenABI, splitterTokenAddress);
        splitterContractInstance = new web3.eth.Contract(splitterContractABI, splitterContractAddress);
        console.log("Contracts initialized with Token:", splitterTokenAddress, "Splitter:", splitterContractAddress);
        return true;
    } catch (error) {
         console.error("Error initializing contract instances:", error);
         updateConnectionStatus(false, 'Contract Init Failed');
         alert(`Could not initialize contracts: ${error.message}`);
         tokenContractInstance = null;
         splitterContractInstance = null;
         return false;
    }
}

// --- UI Update & State Management ---
function updateConnectionStatus(isConnected, message = '') {
    if (isConnected) {
        statusSpan.textContent = 'Connected';
        connectionStatusShortSpan.textContent = 'Connected';
        connectionStatusShortSpan.style.color = '#4CAF50';
        connectButton.textContent = 'Wallet Connected';
        connectButton.disabled = true;
        appContentDiv.style.display = 'block';
        connectionDetailsDiv.style.display = 'block';
        navLinks.forEach(link => link.classList.remove('disabled'));

    } else {
        statusSpan.textContent = message || 'Not Connected';
        connectionStatusShortSpan.textContent = message || 'Not Connected';
         connectionStatusShortSpan.style.color = '#ccc';
        connectButton.textContent = 'Connect Wallet';
        connectButton.disabled = false;
        appContentDiv.style.display = 'none';
        connectionDetailsDiv.style.display = 'none';
        navLinks.forEach(link => link.classList.add('disabled'));
        accountSpan.textContent = 'N/A';
        chainIdSpan.textContent = 'N/A';
    }
    if (isConnected && userAccount) {
         accountSpan.textContent = userAccount;
    }
}

function showSection(sectionId) {
    if (!userAccount) {
        alert("Please connect your wallet first.");
        return;
    }
    console.log("Showing section:", sectionId);
    allSections.forEach(section => {
        section.style.display = 'none';
    });
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'block';
        if (sectionId === 'view-groups-section') {
            document.getElementById('groups-list').innerHTML = '<p>Enter a Group ID and click "View Group Details".</p>';
        }
    } else {
        console.error("Section not found:", sectionId);
    }
}

function resetAppState() {
     userAccount = null;
     tokenContractInstance = null;
     splitterContractInstance = null;
     updateConnectionStatus(false);
      allSections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('groups-list').innerHTML = '';
}

// --- Event Handlers ---
async function handleAccountsChanged(accounts) {
    console.log('handleAccountsChanged:', accounts);
    if (accounts.length === 0) {
        console.log('MetaMask disconnected or locked.');
        resetAppState();
    } else {
        userAccount = accounts[0];
        console.log('Account changed/connected:', userAccount);
        web3 = new Web3(window.ethereum);
        const chainId = await web3.eth.getChainId();
        chainIdSpan.textContent = chainId.toString();
        if (chainId.toString() !== SEPOLIA_CHAIN_ID) {
            updateConnectionStatus(false, 'Wrong Network');
            alert(`Please switch MetaMask to the Sepolia Test Network (Chain ID ${SEPOLIA_CHAIN_ID}).`);
            resetAppState();
            return;
        }
        const contractsInitialized = await initializeContracts();
        if (contractsInitialized) {
            updateConnectionStatus(true);
        } else {
            updateConnectionStatus(false, 'Contract Init Failed');
            resetAppState();
        }
    }
}

async function handleChainChanged(chainId) {
    console.log('Network chain changed to:', chainId);
    alert("Network changed. Reloading the DApp...");
    window.location.reload();
}

// --- Navigation & Form Setup ---
function setupNavigation() {
    document.getElementById('nav-create-group').addEventListener('click', (e) => { e.preventDefault(); showSection('create-group-section'); });
    document.getElementById('nav-add-expense').addEventListener('click', (e) => { e.preventDefault(); showSection('add-expense-section'); });
     document.getElementById('nav-view-groups').addEventListener('click', (e) => { e.preventDefault(); showSection('view-groups-section'); });
}

function setupFormListeners() {
    createGroupForm.addEventListener('submit', handleCreateGroup);
    addExpenseForm.addEventListener('submit', handleAddExpense);
    settleDebtForm.addEventListener('submit', handleSettleDebt);
    fetchGroupDetailsButton.addEventListener('click', fetchAndDisplayGroupDetails);
}

// --- Contract Interaction Functions ---
async function handleCreateGroup(event) {
    event.preventDefault();
    if (!splitterContractInstance || !userAccount || !web3) {
        return alert("Please connect wallet and ensure connection is active.");
    }
    const membersInput = document.getElementById('groupMembers').value;
    const resultDiv = document.getElementById('create-group-result');
    resultDiv.textContent = 'Processing...';
    resultDiv.style.color = 'black';
    resultDiv.className = 'result-box';

    const zeroAddress = "0x0000000000000000000000000000000000000000";
    console.log("Raw members input:", membersInput); // Log raw input

    const initialAddresses = membersInput.split(',').map(addr => addr.trim());
    console.log("Split addresses:", initialAddresses); // Log after split/trim

    const memberAddresses = initialAddresses.filter(addr => {
        const isAddr = web3.utils.isAddress(addr);
        if (isAddr && addr.toLowerCase() === zeroAddress) {
            console.warn("Zero address filtered out:", addr);
            return false;
        }
        if (!isAddr && addr !== '') {
             console.warn("Invalid address format filtered out:", addr);
        }
        return isAddr;
    });
    console.log("Filtered addresses to send:", memberAddresses); // Log final list being sent

    if (memberAddresses.length === 0 && membersInput.trim() !== '') {
         resultDiv.textContent = 'Error: Invalid or no valid non-zero addresses entered. Separate with commas.';
         resultDiv.classList.add('error');
        return;
    }
     if (userAccount.toLowerCase() === zeroAddress) {
         resultDiv.textContent = 'Error: Connected account appears to be the zero address.';
          resultDiv.classList.add('error');
        return;
     }

    try {
        console.log("Calling createGroup on contract:", splitterContractAddress);
        console.log("Sending members list:", JSON.stringify(memberAddresses)); // Log as JSON string
        console.log("From account:", userAccount);

        // ***** Ensure instance is using the correct address *****
        if (!splitterContractInstance || splitterContractInstance.options.address.toLowerCase() !== splitterContractAddress.toLowerCase()) {
             console.error("Contract instance address mismatch!", splitterContractInstance?.options?.address, splitterContractAddress);
            throw new Error("Contract instance mismatch. Please reconnect wallet.");
        }
        // ********************************************************

        const gasEstimate = await splitterContractInstance.methods.createGroup(memberAddresses).estimateGas({ from: userAccount });
        console.log("Estimated Gas:", gasEstimate);
        const receipt = await splitterContractInstance.methods.createGroup(memberAddresses).send({ from: userAccount, gas: (BigInt(gasEstimate) * BigInt(12) / BigInt(10)).toString() });
        console.log("Transaction Receipt:", receipt);

        let groupId = 'N/A';
        if (receipt.events.GroupCreated && receipt.events.GroupCreated.returnValues) {
            groupId = receipt.events.GroupCreated.returnValues.groupId;
        }

        const etherscanTxLink = `https://sepolia.etherscan.io/tx/${receipt.transactionHash}`;
        const linkHtml = ` <a href="${etherscanTxLink}" target="_blank" rel="noopener noreferrer">(View on Etherscan)</a>`;
        const gasCostString = await calculateAndFormatGasCost(receipt);

        resultDiv.innerHTML = `Group created successfully! Group ID: ${groupId}.${linkHtml}${gasCostString}`;
        resultDiv.classList.add('success');
        createGroupForm.reset();

    } catch (error) {
        console.error("Error creating group:", error);
        let detailedError = error.message;
         if (error.data && typeof error.data === 'string' && error.data.startsWith('0x')) {
              const selector = error.data.substring(0, 10).toLowerCase();
              if (selector === '0x52dedfcd') detailedError += " (Reason: AddressZero - Contract detected a zero address)";
              else detailedError += ` (Unknown custom error: ${selector})`;
         } else if (error.code === 4001) {
             detailedError = "Transaction rejected in MetaMask.";
         }

        resultDiv.textContent = `Error: ${detailedError}`;
        resultDiv.classList.add('error');
    }
}

async function handleAddExpense(event) {
    event.preventDefault();
    if (!splitterContractInstance || !userAccount) return alert("Please connect wallet.");
    const resultDiv = document.getElementById('add-expense-result');
    resultDiv.textContent = 'Processing...';
    resultDiv.style.color = 'black';
    
    const groupId = document.getElementById('expenseGroupId').value;
    const description = document.getElementById('expenseDescription').value;
    const amountSPT = document.getElementById('expenseAmount').value;
    const payer = document.getElementById('expensePayer').value;
    const participantsInput = document.getElementById('expenseParticipants').value;
    
    if (!web3.utils.isAddress(payer)) { 
        resultDiv.textContent = 'Error: Invalid Payer address.'; 
        resultDiv.style.color = 'red'; 
        return; 
    }
    
    const participantAddresses = participantsInput.split(',').map(addr => addr.trim()).filter(addr => web3.utils.isAddress(addr));
    if (participantAddresses.length === 0) { 
        resultDiv.textContent = 'Error: Invalid or no valid participant addresses entered.'; 
        resultDiv.style.color = 'red'; 
        return; 
    }
    
    let amountSmallestUnit;
    try { 
        amountSmallestUnit = web3.utils.toWei(amountSPT, 'ether'); 
        if (BigInt(amountSmallestUnit) <= 0) throw new Error("Amount must be positive."); 
    } catch (err) { 
        resultDiv.textContent = `Error: Invalid Amount (${err.message}). Enter a valid number.`; 
        resultDiv.style.color = 'red'; 
        return; 
    }
    
    console.log(`Adding expense: Group ${groupId}, Desc: ${description}, Amount: ${amountSmallestUnit}, Payer: ${payer}, Participants: ${participantAddresses}`);
    
    try {
        const gasEstimate = await splitterContractInstance.methods.addExpense(
            groupId, 
            description, 
            amountSmallestUnit, 
            payer, 
            participantAddresses
        ).estimateGas({ from: userAccount });
        
        const receipt = await splitterContractInstance.methods.addExpense(
            groupId, 
            description, 
            amountSmallestUnit, 
            payer, 
            participantAddresses
        ).send({ from: userAccount, gas: (BigInt(gasEstimate) * BigInt(12) / BigInt(10)).toString() });
        
        console.log("Transaction Receipt:", receipt);

        // Add Etherscan link
        const etherscanTxLink = `https://sepolia.etherscan.io/tx/${receipt.transactionHash}`;
        const linkHtml = ` <a href="${etherscanTxLink}" target="_blank" rel="noopener noreferrer">(View on Etherscan)</a>`;

        const gasCostString = await calculateAndFormatGasCost(receipt);
        resultDiv.innerHTML = `Expense added successfully!${linkHtml}${gasCostString}`;
        resultDiv.style.color = 'green';
        addExpenseForm.reset();

    } catch (error) { 
        console.error("Error adding expense:", error); 
        resultDiv.textContent = `Error: ${error.message}`; 
        resultDiv.style.color = 'red'; 
    }
}

async function handleSettleDebt(event) {
    event.preventDefault();
    if (!splitterContractInstance || !tokenContractInstance || !userAccount) return alert("Connect wallet and ensure contracts loaded.");

    const resultDiv = document.getElementById('settle-debt-result');
    resultDiv.textContent = 'Processing...';
    resultDiv.style.color = 'black';

    let approveTxHash = null; // Variable to store approve hash
    let settleTxHash = null;  // Variable to store settle hash

    const groupId = document.getElementById('settleGroupId').value;
    const creditor = document.getElementById('settleCreditor').value;
    const amountSPT = document.getElementById('settleAmount').value;

    if (!groupId || groupId.trim() === '') {
        resultDiv.textContent = 'Error: Group ID is required.';
        resultDiv.style.color = 'red';
        return;
    }
    
    if (!web3.utils.isAddress(creditor)) {
        resultDiv.textContent = 'Error: Invalid Creditor address.';
        resultDiv.style.color = 'red';
        return;
    }
    
    let amountToSettleSmallestUnit;
    try {
        amountToSettleSmallestUnit = web3.utils.toWei(amountSPT, 'ether');
        if (BigInt(amountToSettleSmallestUnit) <= 0) throw new Error("Amount must be positive.");
    } catch (err) {
        resultDiv.textContent = `Error: Invalid Amount (${err.message}).`;
        resultDiv.style.color = 'red';
        return;
    }

    console.log(`Attempting to settle debt: Group ${groupId}, Creditor: ${creditor}, Amount: ${amountToSettleSmallestUnit} (${amountSPT} SPT)`);

    try {
        resultDiv.textContent = 'Checking current balance...';
        const currentDebtorBalanceWei = await splitterContractInstance.methods.getMemberBalance(groupId, userAccount).call();
        const currentDebtorBalanceSPT = web3.utils.fromWei(currentDebtorBalanceWei.toString(), 'ether');
        console.log(`Current balance check for ${userAccount} in group ${groupId}: ${currentDebtorBalanceWei} (${currentDebtorBalanceSPT} SPT)`);

        if (BigInt(currentDebtorBalanceWei) >= 0) {
            resultDiv.textContent = `Error: Your balance in Group ${groupId} is ${currentDebtorBalanceSPT} SPT. You do not owe money in this group. Cannot settle.`;
            resultDiv.style.color = 'red';
            return;
        }

        if (BigInt(amountToSettleSmallestUnit) > BigInt(-currentDebtorBalanceWei)) {
            resultDiv.textContent = `Error: Amount to settle (${amountSPT} SPT) exceeds your actual debt (${web3.utils.fromWei((-currentDebtorBalanceWei).toString(), 'ether')} SPT). Please enter the correct amount or less.`;
            resultDiv.style.color = 'red';
            return;
        }

        resultDiv.textContent = `Step 1/2: Requesting approval to spend ${amountSPT} SPT... (Your balance: ${currentDebtorBalanceSPT} SPT)`;
        console.log(`Approving ${splitterContractAddress} to spend ${amountToSettleSmallestUnit} for ${userAccount}`);

        const approveGas = await tokenContractInstance.methods.approve(splitterContractAddress, amountToSettleSmallestUnit).estimateGas({ from: userAccount });
        const approveReceipt = await tokenContractInstance.methods.approve(splitterContractAddress, amountToSettleSmallestUnit).send({ from: userAccount, gas: (BigInt(approveGas) * BigInt(12) / BigInt(10)).toString() });

        console.log("Approval Receipt:", approveReceipt);
        approveTxHash = approveReceipt.transactionHash;

        // Add Etherscan link for approve transaction
        const approveEtherscanLink = `https://sepolia.etherscan.io/tx/${approveTxHash}`;
        const approveLinkHtml = ` <a href="${approveEtherscanLink}" target="_blank" rel="noopener noreferrer">(View on Etherscan)</a>`;

        const approveGasCostString = await calculateAndFormatGasCost(approveReceipt);
        resultDiv.innerHTML = `Step 1/2: Approval successful!${approveLinkHtml}${approveGasCostString}<br>Proceeding to settle...`;

        console.log(`Calling settleDebt on ${splitterContractAddress}`);
        const settleGas = await splitterContractInstance.methods.settleDebt(groupId, creditor, amountToSettleSmallestUnit).estimateGas({ from: userAccount });
        const settleReceipt = await splitterContractInstance.methods.settleDebt(groupId, creditor, amountToSettleSmallestUnit).send({ from: userAccount, gas: (BigInt(settleGas) * BigInt(12) / BigInt(10)).toString() });

        console.log("Settle Receipt:", settleReceipt);
        settleTxHash = settleReceipt.transactionHash;

        // Add Etherscan link for settle transaction
        const settleEtherscanLink = `https://sepolia.etherscan.io/tx/${settleTxHash}`;
        const settleLinkHtml = ` <a href="${settleEtherscanLink}" target="_blank" rel="noopener noreferrer">(View on Etherscan)</a>`;

        const settleGasCostString = await calculateAndFormatGasCost(settleReceipt);
        // Show both links in final message
        resultDiv.innerHTML = `Debt settled successfully! Settle Tx: ${settleLinkHtml}${settleGasCostString}<br>(Approve Tx: <a href="${approveEtherscanLink}" target="_blank" rel="noopener noreferrer">${approveTxHash.substring(0,10)}...</a>)`;
        resultDiv.style.color = 'green';
        settleDebtForm.reset();

        if (viewGroupsSection.style.display !== 'none') {
            fetchGroupDetailsById(groupId);
        }

    } catch (error) {
        console.error("Error settling debt:", error);
        let detailedError = error.message;
        if (error.data && typeof error.data === 'string' && error.data.startsWith('0x')) {
            const selector = error.data.substring(0, 10).toLowerCase();
            if (selector === '0x64ddcf37') detailedError += " (Reason: DebtorOwesNoMoney - Check if you are connected with the correct account)";
            else if (selector === '0xf9e36935') detailedError += " (Reason: AmountExceedsCredit - Creditor isn't owed this much)";
            else if (selector === '0x88a38952') detailedError += " (Reason: AmountExceedsDebt - You tried to settle more than you owe)";
            else if (selector === '0x051be539') detailedError += " (Reason: InsufficientAllowance - Approval might have failed or was for less)";
            else detailedError += ` (Unknown custom error: ${selector})`;
        } else if (error.code === 4001) {
            detailedError = "Transaction rejected in MetaMask.";
        }

        // Optionally add link to failed tx if hash is available
        let errorMsg = `Error: ${detailedError}`;
        if (settleTxHash) { // If settle failed but we got a hash
            errorMsg += ` <a href="https://sepolia.etherscan.io/tx/${settleTxHash}" target="_blank" rel="noopener noreferrer">(View Failed Tx)</a>`;
        } else if (approveTxHash) { // If approve failed but we got a hash
            errorMsg += ` <a href="https://sepolia.etherscan.io/tx/${approveTxHash}" target="_blank" rel="noopener noreferrer">(View Failed Tx)</a>`;
        }
        resultDiv.innerHTML = errorMsg; // Use innerHTML for link
        resultDiv.style.color = 'red';
    }
}

// --- Data Fetching Functions ---
function fetchAndDisplayGroupDetails() {
    const groupId = viewGroupIdInput.value;
    if (!groupId || groupId.trim() === '') {
        alert("Please enter a Group ID to view.");
        return;
    }
    if (!/^\d+$/.test(groupId)) {
        alert("Please enter a valid number for the Group ID.");
        return;
    }
    fetchGroupDetailsById(groupId);
}

async function fetchGroupDetailsById(groupIdToFetch) {
    const groupsListDiv = document.getElementById('groups-list');
    groupsListDiv.innerHTML = `<p>Fetching details for Group ID: ${groupIdToFetch}...</p>`;

    if (!splitterContractInstance || !userAccount) {
        groupsListDiv.innerHTML = '<p>Connect wallet first.</p>';
        return;
    }

    try {
        const members = await splitterContractInstance.methods.getGroupMembers(groupIdToFetch).call();

        if (!members || members.length === 0) {
            groupsListDiv.innerHTML = `<p>Group ID ${groupIdToFetch} not found or has no members.</p>`;
            return;
        }

        let groupHtml = `<h3>Group ID: ${groupIdToFetch}</h3><ul>`;
        const balancePromises = members.map(async (member) => {
            const balanceWei = await splitterContractInstance.methods.getMemberBalance(groupIdToFetch, member).call();
            const balanceSPT = web3.utils.fromWei(balanceWei.toString(), 'ether');
            const balanceSign = BigInt(balanceWei) >= 0 ? '+' : '';
            return `<li>${member}: ${balanceSign}${balanceSPT} SPT</li>`;
        });

        const balanceItems = await Promise.all(balancePromises);
        groupHtml += balanceItems.join('');
        groupHtml += '</ul>';

        groupHtml += `<button class="settle-button" onclick="showSettleForm(${groupIdToFetch})">Settle Debts in Group ${groupIdToFetch}</button>`;

        groupsListDiv.innerHTML = groupHtml;

    } catch (error) {
        console.error(`Error fetching details for group ${groupIdToFetch}:`, error);
        groupsListDiv.innerHTML = `<p>Error fetching details for group ${groupIdToFetch}: ${error.message}</p>`;
    }
}

// --- Helper Functions ---
function showSettleForm(groupId) {
    document.getElementById('settleGroupId').value = groupId;
    showSection('settle-debt-section');
}

console.log("app.js loaded");

