// src/errors/test.js

const ConnectionError = require('./connectionError');
const InvalidArgumentError = require('./invalidArgError');
const RpcError = require('./rpcError');
const TransactionError = require('./transactionError');

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

// Simulate a connection error
console.log("-- Simulating Connection Error");

try {
  // Throwing a ConnectionError to simulate failure to connect to the Quantova node
  throw new ConnectionError(
    "Failed to connect to Quantova node.",
    "https://mainnet.quantova.io/",
    "502", // HTTP status code (Bad Gateway)
    "https://mainnet.quantova.io/", // Retry URL
    { timeout: "30s", method: "POST" } // Additional info
  );
} catch (error) {
  // Handling the error and logging the formatted message
  console.log(error.getFormattedErrorMessage()); // User-friendly message

  // Log additional context for debugging
  console.log("Additional error context:", error.getAdditionalContext());

  // Attempt to retry the connection using the retryFunction
  error.retryConnection(retryFunction)
    .then(result => {
      console.log(result); // Log the successful reconnection message
    })
    .catch(err => {
      console.error("Error retrying connection:", err.message); // Handle the retry failure
    });
}

// Simulating an InvalidArgumentError
console.log("\n-- Simulating Invalid Argument Error");

console.log("-- invalid arg error")

// Simulating a function that expects an Quantova address or string
const simulateTransferFunction = (value) => {
  // Check if the value is a valid Quantova address or string
  if (typeof value !== 'string' || !/^0x[a-fA-F0-9]{40}$/.test(value)) {
    throw new InvalidArgumentError(
      "Invalid argument passed to the function.",
      "transfer", // The function name
      value, // The invalid value
      "string or address", // The expected type
      { timestamp: new Date().toISOString(), method: "POST" } // Additional context (timestamp, method)
    );
  }
  console.log("Transfer successful:", value);
};

// Simulate a test where an invalid address is passed to the transfer function
try {
  const invalidAddress = "12345"; // Invalid address (should be a valid Quantova address)
  simulateTransferFunction(invalidAddress);
} catch (error) {
  if (error instanceof InvalidArgumentError) {
    // Handling the InvalidArgumentError
    console.log(error.getFormattedErrorMessage()); // Display user-friendly message
    console.log("Detailed Error Context:", error.getAdditionalContext()); // Display additional context
  } else {
    console.error("Unexpected Error:", error);
  }
}

// Simulate a correct address input for successful transfer
try {
  const validAddress = "0x32Be343B94f860124dC4fEe278FDCBD38C102D88"; // Valid Quantova address
  simulateTransferFunction(validAddress);
} catch (error) {
  if (error instanceof InvalidArgumentError) {
    console.log(error.getFormattedErrorMessage());
  } else {
    console.error("Unexpected Error:", error);
  }
}

// Simulating RpcError
console.log("\n-- Simulating RPC Error");

const simulateRPCRequest = (rpcUrl) => {
  // Simulate an error from the RPC endpoint
  const statusCode = 500;
  const responseBody = {
    error: {
      message: "Internal Server Error",
      code: -32000
    }
  };

  if (statusCode !== 200) {
    throw new RpcError(
      "RPC request failed.",
      rpcUrl, // The URL of the RPC endpoint
      "eth_blockNumber", // The method being called
      statusCode, // The HTTP status code
      { timeout: "30s", method: "POST" }, // Additional context
      responseBody // Error response from the RPC server
    );
  }
};

try {
  // Simulating an RPC call failure
  simulateRPCRequest("https://mainnet.quantova.io/");
} catch (error) {
  if (error instanceof RpcError) {
    // Handling the RPC Error
    console.log(error.getFormattedErrorMessage()); // Display user-friendly message
    console.log("Additional Error Context:", error.getAdditionalContext()); // Display detailed context

    // Check the error message from the response body
    console.log("Response Error Message:", error.parseResponseError());
  } else {
    console.error("Unexpected Error:", error);
  }
}

// Simulate a transaction error
console.log("-- Simulating Transaction Error");

// Simulating a function that processes a transaction
const simulateTransaction = (txHash, statusCode, transactionData, responseBody) => {
  // Simulate a transaction failure by throwing a TransactionError
  throw new TransactionError(
    "Transaction failed due to insufficient gas.",
    txHash, 
    statusCode, 
    transactionData, 
    responseBody
  );
};

// Test the transaction error simulation
console.log("-- Simulating Transaction Error");

try {
  // Simulate a failed Quantova transaction
  simulateTransaction(
    "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", // Transaction hash
    400, // HTTP status code (Bad Request)
    { gasLimit: "0x10000", gasUsed: "0x20000" }, // Transaction data
    { error: { message: "Insufficient gas" } } // Response body from the server
  );
} catch (error) {
  if (error instanceof TransactionError) {
    // Handling the TransactionError
    console.log(error.getFormattedErrorMessage()); // Display user-friendly message
    console.log("Detailed Error Context:", error.getAdditionalContext()); // Display additional context
    console.log("Response Error Message:", error.parseResponseError()); // Parse error from response body

    // Check if the transaction was successful
    console.log("Transaction Successful:", error.isTransactionSuccessful()); // false
  } else {
    console.error("Unexpected Error:", error);
  }
}

