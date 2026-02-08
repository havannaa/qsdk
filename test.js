// Import all the utilities from the utils directory via index.js
const { 
  AddressUtils, 
  BigIntUtils, 
  FormatUtils, 
  HexUtils, 
  NumberUtils, 
  ValidationUtils 
} = require('./src/utils');

const { ABIUtils, JSONUtils, StringUtils, RLP } = require('./src/encoding');

// Import all the custom error classes
const { ConnectionError, InvalidArgumentError, RpcError, TransactionError } = require('./src/errors');

// --- Test 1: AddressUtils ---
console.log("Testing AddressUtils:");

// Test if a valid Quantova address is detected
const validAddress = '0x32Be343B94f860124dC4fEe278FDCBD38C102D88';
const invalidAddress = '0x12345';

console.log(`Is valid address: ${AddressUtils.isAddress(validAddress)}`); // true
console.log(`Is valid address: ${AddressUtils.isAddress(invalidAddress)}`); // false

// Test address formatting
console.log(`Formatted address: ${AddressUtils.formatAddress(validAddress)}`); // all lowercase

// Test checksum address
console.log(`Checksum address: ${AddressUtils.toChecksumAddress(validAddress)}`);

// --- Test 2: BigIntUtils ---
console.log("\nTesting BigIntUtils:");

// Convert string to BigInt and check the value
const bigIntValue = BigIntUtils.toBigInt('1000000000000000000');
console.log(`BigInt value: ${bigIntValue}`); // BigInt('1000000000000000000')

// Perform arithmetic with BigInt values
const sum = BigIntUtils.add('1000000000000000000', '500000000000000000');
console.log(`Sum of BigInts: ${sum}`); // BigInt('1500000000000000000')

// --- Test 3: FormatUtils ---
console.log("\nTesting FormatUtils:");

// Convert Wei to Ether
const weiValue = '1000000000000000000'; // 1 Ether in Wei
console.log(`Ether value: ${FormatUtils.weiToEther(weiValue)}`); // "1"
console.log(`Ether value: ${FormatUtils.weiToEther(1000000000000000000)}`); // "1"

// Format a large number with commas
const largeNumber = '1000000000000000000000000';
console.log(`Formatted number: ${FormatUtils.formatNumber(largeNumber)}`); // "1,000,000,000,000,000,000,000,000"

// --- Test 4: HexUtils ---
console.log("\nTesting HexUtils:");

// Convert string to hex and back
console.log(`String to hex: ${HexUtils.stringToHex('Hello')}`); // "0x48656c6c6f"
console.log(`Hex to string: ${HexUtils.hexToString('0x48656c6c6f')}`); // "Hello"

// Convert number to hex and back
console.log(`Number to hex: ${HexUtils.numberToHex(255)}`); // "0xff"
console.log(`BigInt to hex: ${HexUtils.bigIntToHex(BigInt('1000000000000000000'))}`); // "0xde0b6b3a7640000"

// --- Test 5: NumberUtils ---
console.log("\nTesting NumberUtils:");

// Convert number to hexadecimal
console.log(`Number to hex: ${NumberUtils.toHex(255)}`); // "0xff"

// Convert string or BigInt to number
console.log(`String to number: ${NumberUtils.toNumber('1000')}`); // 1000
console.log(`BigInt to number: ${NumberUtils.toNumber(BigInt('1000'))}`); // 1000

// Round number
console.log(`Rounded value: ${NumberUtils.round(25.123456789, 2)}`); // "25.12"
console.log(`Rounded value: ${NumberUtils.round('25.123456789', 3)}`); // "25.123"

// --- Test 6: ValidationUtils ---
console.log("\nTesting ValidationUtils:");

// Validate Quantova address and private key
console.log(`Is valid Quantova address: ${ValidationUtils.isAddress('0x32Be343B94f860124dC4fEe278FDCBD38C102D88')}`); // true
console.log(`Is valid Quantova address: ${ValidationUtils.isAddress('0x12345')}`); // false

console.log(`Is valid private key: ${ValidationUtils.isPrivateKey('0x4c0883a6910395b8e0f2f7e3f1c3b2c3b9b9c5192a513e0a4e3ff1b609d9e9c4')}`); // true
console.log(`Is valid private key: ${ValidationUtils.isPrivateKey('0xINVALIDPRIVATEKEY')}`); // false

console.log(`Is valid transaction hash: ${ValidationUtils.isTxHash('0x9f6f6a7bb71b70f1f9b8c9db303f9b8bc75de9e9b9e6f7be429fbeb464ee0dd1')}`); // true
console.log(`Is valid transaction hash: ${ValidationUtils.isTxHash('0xINVALIDTXHASH')}`); // false

console.log(`Is valid number: ${ValidationUtils.isNumber(123)}`); // true
console.log(`Is valid number: ${ValidationUtils.isNumber('123.45')}`); // true
console.log(`Is valid number: ${ValidationUtils.isNumber('abc')}`); // false

console.log(`Is valid hex: ${ValidationUtils.isHex('0xde0b6b3a7640000')}`); // true
console.log(`Is valid hex: ${ValidationUtils.isHex('0xINVALIDHEX')}`); // false


// ABIUtils
// Example usage of ABIUtils (Encoding a uint256 value)
const encodedUInt256 = ABIUtils.encodeParameter('uint256', 1234567890);
console.log(`Encoded uint256: ${encodedUInt256}`);

// Example usage of JSONUtils (Encoding a JSON object)
const jsonObject = { recipient: '0x32Be343B94f860124dC4fEe278FDCBD38C102D88', amount: 1000 };
const encodedJSON = JSONUtils.encodeJSON(jsonObject);
console.log(`Encoded JSON object: ${encodedJSON}`);

// Example usage of StringUtils (Encoding a string to hex)
const stringToEncode = "Hello, Quantova!";
const encodedString = StringUtils.encode(stringToEncode);
console.log(`Encoded string: ${encodedString}`);

// Example usage of RLP (Encoding a list of values)
const encodedList = RLP.encode([1000, 'Hello', '0x32Be343B94f860124dC4fEe278FDCBD38C102D88']);
console.log(`Encoded list: ${encodedList}`);

// --- Simulate ConnectionError ---
console.log("\nSimulating ConnectionError");

// Simulating the retry function for connection
const retryFunction = (retryUrl) => {
  console.log(`Reconnecting to: ${retryUrl}`);
  // Simulating a retry attempt with a delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulating a successful reconnection after 2 seconds
      resolve(`Successfully connected to ${retryUrl}`);
    }, 2000);
  });
};

try {
  throw new ConnectionError(
    "Failed to connect to Quantova node.",
    "https://mainnet.quantova.io/",
    "502",
    "https://mainnet.quantova.io/",
    { timeout: "30s", method: "POST" }
  );
} catch (error) {
  console.log(error.getFormattedErrorMessage());
  console.log("Additional error context:", error.getAdditionalContext());
  error.retryConnection(retryFunction)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.error("Error retrying connection:", err.message);
    });
}

// --- Simulate InvalidArgumentError ---
console.log("\nSimulating InvalidArgumentError");

const simulateTransferFunction = (value) => {
  if (typeof value !== 'string' || !/^0x[a-fA-F0-9]{40}$/.test(value)) {
    throw new InvalidArgumentError(
      "Invalid argument passed to the function.",
      "transfer",
      value,
      "string or address",
      { timestamp: new Date().toISOString(), method: "POST" }
    );
  }
  console.log("Transfer successful:", value);
};

try {
  const invalidAddress = "12345"; // Invalid address
  simulateTransferFunction(invalidAddress);
} catch (error) {
  if (error instanceof InvalidArgumentError) {
    console.log(error.getFormattedErrorMessage());
    console.log("Detailed Error Context:", error.getAdditionalContext());
  } else {
    console.error("Unexpected Error:", error);
  }
}

try {
  const validAddress = "0x32Be343B94f860124dC4fEe278FDCBD38C102D88"; // Valid address
  simulateTransferFunction(validAddress);
} catch (error) {
  if (error instanceof InvalidArgumentError) {
    console.log(error.getFormattedErrorMessage());
  } else {
    console.error("Unexpected Error:", error);
  }
}

// --- Simulate RpcError ---
console.log("\nSimulating RpcError");

const simulateRPCRequest = (rpcUrl) => {
  const statusCode = 500;
  const responseBody = { error: { message: "Internal Server Error", code: -32000 } };

  if (statusCode !== 200) {
    throw new RpcError(
      "RPC request failed.",
      rpcUrl,
      "eth_blockNumber",
      statusCode,
      { timeout: "30s", method: "POST" },
      responseBody
    );
  }
};

try {
  simulateRPCRequest("https://mainnet.quantova.io/");
} catch (error) {
  if (error instanceof RpcError) {
    console.log(error.getFormattedErrorMessage());
    console.log("Additional Error Context:", error.getAdditionalContext());
    console.log("Response Error Message:", error.parseResponseError());
  } else {
    console.error("Unexpected Error:", error);
  }
}

// --- Simulate TransactionError ---
console.log("\nSimulating TransactionError");

const simulateTransaction = (txHash, statusCode, transactionData, responseBody) => {
  throw new TransactionError(
    "Transaction failed due to insufficient gas.",
    txHash,
    statusCode,
    transactionData,
    responseBody
  );
};

try {
  simulateTransaction(
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    400,
    { gasLimit: "0x10000", gasUsed: "0x20000" },
    { error: { message: "Insufficient gas" } }
  );
} catch (error) {
  if (error instanceof TransactionError) {
    console.log(error.getFormattedErrorMessage());
    console.log("Detailed Error Context:", error.getAdditionalContext());
    console.log("Response Error Message:", error.parseResponseError());
    console.log("Transaction Successful:", error.isTransactionSuccessful());
  } else {
    console.error("Unexpected Error:", error);
  }
}

