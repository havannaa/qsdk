# Errors Module

This directory contains custom error classes for handling various error scenarios in Quantova. Each error class provides more context and details, which are useful for debugging and user-friendly messages.

## Available Error Classes

### **ConnectionError**

* **Purpose**: Handles connection issues when interacting with Quantova nodes RPC endpoints.
* **Key Methods**:

  * `getFormattedErrorMessage()`: Provides a user-friendly message.
  * `getAdditionalContext()`: Returns additional error details.
  * `retryConnection()`: Retries the connection using a provided function.

### **InvalidArgumentError**

* **Purpose**: Handles invalid arguments passed to functions or methods, such as incorrect Quantova address or data type.
* **Key Methods**:

  * `getFormattedErrorMessage()`: Provides a user-friendly message with details of the invalid argument.
  * `getAdditionalContext()`: Returns additional context for debugging.

### **RpcError**

* **Purpose**: Handles errors related to RPC calls, such as failed Quantova JSON-RPC method calls.
* **Key Methods**:

  * `getFormattedErrorMessage()`: Provides a formatted message for the error.
  * `getAdditionalContext()`: Returns detailed context, including the RPC method and response.
  * `parseResponseError()`: Extracts the error message from the response body.

### **TransactionError**

* **Purpose**: Handles errors that occur during Quantova transactions, such as insufficient gas or transaction failures.
* **Key Methods**:

  * `getFormattedErrorMessage()`: Provides a user-friendly message with the transaction hash.
  * `getAdditionalContext()`: Returns additional details about the failed transaction.
  * `isTransactionSuccessful()`: Checks if the transaction was successful.

## Usage

You can import the error classes individually or all at once using the `index.js`:

```javascript
const { ConnectionError, InvalidArgumentError, RpcError, TransactionError } = require('./errors');

// Example usage of ConnectionError
try {
  throw new ConnectionError("Failed to connect", "https://mainnet.quantova.io");
} catch (error) {
  console.log(error.getFormattedErrorMessage());
}
```

## Installation

Simply include this directory and import the required error classes as needed.

---
