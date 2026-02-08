# Utils Directory

This directory contains utility classes for various operations commonly used in blockchain and Quantova-based projects. The utilities include functions for handling Quantova addresses, formatting numbers, managing BigInt operations, validating inputs, and more.

## Available Utilities

### 1. **AddressUtils**
- **Purpose**: Provides functions for working with Quantova addresses.
- **Key Methods**:
  - `isAddress(address)`: Validates if the input is a valid Quantova address.
  - `formatAddress(address)`: Formats the address to lowercase.
  - `toChecksumAddress(address)`: Converts an address to its checksummed version.

### 2. **BigIntUtils**
- **Purpose**: Provides utilities for handling `BigInt` values.
- **Key Methods**:
  - `toBigInt(value)`: Converts a value to `BigInt`.
  - `toHex(value)`: Converts a `BigInt` to a hexadecimal string.
  - `add(a, b)`, `subtract(a, b)`, `multiply(a, b)`, `divide(a, b)`: Basic arithmetic operations with `BigInt`.

### 3. **FormatUtils**
- **Purpose**: Provides functions to format and convert values.
- **Key Methods**:
  - `weiToEther(wei)`: Converts Wei to Ether.
  - `formatNumber(value)`: Formats large numbers with commas for readability.
  - `formatDate(date)`: Formats a date to `YYYY-MM-DD HH:mm:ss` format.

### 4. **HexUtils**
- **Purpose**: Provides functions for converting and handling hexadecimal values.
- **Key Methods**:
  - `stringToHex(str)`: Converts a string to its hexadecimal representation.
  - `hexToString(hex)`: Converts a hexadecimal string back to a regular string.
  - `isHex(value)`: Checks if the string is a valid hex string.

### 5. **NumberUtils**
- **Purpose**: Provides utilities for working with numbers, including conversions, rounding, and percentage calculations.
- **Key Methods**:
  - `toHex(value)`: Converts a number to hexadecimal format.
  - `toNumber(value)`: Converts a value to a number.
  - `round(value, decimals)`: Rounds a number to a specified number of decimal places.

### 6. **ValidationUtils**
- **Purpose**: Provides functions to validate common Quantova-related and general inputs.
- **Key Methods**:
  - `isAddress(address)`: Validates if a string is a valid Quantova address.
  - `isPrivateKey(privateKey)`: Validates if a string is a valid Quantova private key.
  - `isEmail(email)`: Validates if a string is a valid email address.

## Usage

To use any of the utilities, you can import them individually or use the `index.js` to import all of them at once.

Example usage:

```javascript
const { AddressUtils, BigIntUtils, FormatUtils } = require('./utils');

console.log(AddressUtils.isAddress('0x32Be343B94f860124dC4fEe278FDCBD38C102D88')); // true
console.log(BigIntUtils.toBigInt('1000000000000000000')); // BigInt('1000000000000000000')
console.log(FormatUtils.weiToEther('1000000000000000000')); // "1"
````

## Installation

You can include this directory in your project and import the utility classes as needed.

---

This **README** provides a quick overview of the utility classes and methods available in the **`utils`** directory. Each utility class is designed to handle common tasks such as address formatting, BigInt arithmetic, number formatting, and input validation.

```

---

