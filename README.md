# Quantova SDK

Quantova SDK to interact with Quantova nodes. This library provides necessary functionality for Quantova blockchain interaction, including querying blockchain data, sending transactions, and interacting with smart contracts.

## Features

- Interact with Quantova nodes via JSON-RPC
- Fetch block data (`q_blockNumber`, `q_getBlockByNumber`)
- Send transactions to the Quantova network
- Interact with smart contracts using ABI encoding/decoding
- Listen to events emitted by smart contracts

## Folder Structure

### **`src/`**
Contains the core modules for blockchain interaction.

- **`utils/`**: Utility functions (address validation, hex conversion, BigInt handling)
- **`encoding/`**: Encoding and decoding functions (RLP, ABI, BigInt, etc.)
- **`errors/`**: Custom error handling
- **`rpc/`**: RPC client and methods for interacting with Quantova nodes
- **`provider/`**: Provider for node communication (network management)
- **`signer/`**: Signing logic for private keys and transactions
- **`transaction/`**: Transaction creation and sending
- **`contract/`**: Smart contract interaction (ABI, events, state mutability)
- **`events/`**: Event handling for contracts and Quantova nodes
- **`wallet/`**: Wallet creation and management
- **`network/`**: Network management (e.g., RPC URL configuration, proxy handling)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/qsdk.git
   cd qsdk
````

2. Install dependencies:

   ```bash
   npm install
   ```

## Usage Example

```javascript
const { Provider, RPCClient } = require('./src');

const provider = new Provider('https://mainnet.quantova.io/');
provider.getBlockNumber()
  .then(blockNumber => console.log('Latest Block Number:', blockNumber))
  .catch(error => console.error('Error:', error));
```

## License

MIT

