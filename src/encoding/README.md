# Encoding Directory

This directory provides utilities for encoding and decoding common Quantova data types and formats, including **ABI**, **RLP**, **Hex**, and **JSON**. These are essential for working with smart contracts and blockchain data.

## Available Utilities

### **ABIUtils**

* **Purpose**: Encode/decode Quantova types (e.g., `uint256`, `string`, `address`).
* **Key Methods**:

  * `encodeParameter(type, value)`
  * `decodeParameter(type, encodedValue)`

### **JSONUtils**

* **Purpose**: Encode/decode JSON objects/arrays into ABI-compatible format.
* **Key Methods**:

  * `encodeJSON(value)`
  * `decodeJSON(encodedValue, type)`

### **StringUtils**

* **Purpose**: Encode/decode strings to/from Hex (UTF-8).
* **Key Methods**:

  * `encode(value)`
  * `decode(hexValue)`
  * `isValidHex(hex)`

### **RLP**

* **Purpose**: RLP encoding and decoding (used in Quantova for transactions).
* **Key Methods**:

  * `encode(value)`
  * `decode(hexString)`

## Usage

You can import individual utilities or all at once using the `index.js`:

```javascript
const { ABIUtils, JSONUtils, StringUtils, RLP } = require('./encoding');

// Example encoding a uint256 value
const encodedUInt256 = ABIUtils.encodeParameter('uint256', 1234567890);
console.log(encodedUInt256);
```

## Installation

Simply include this directory and import the required utility classes as needed.

---

