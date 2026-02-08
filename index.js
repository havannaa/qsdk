// src/index.js

// Importing all utilities from the utils directory
const { 
  AddressUtils, 
  BigIntUtils, 
  FormatUtils, 
  HexUtils, 
  NumberUtils, 
  ValidationUtils 
} = require('./src/utils');

// Importing all encoding utilities from the encoding directory
const { 
  ABIUtils, 
  JSONUtils, 
  StringUtils, 
  RLP 
} = require('./src/encoding');

// Importing all custom error classes from the errors directory
const { 
  ConnectionError, 
  InvalidArgumentError, 
  RpcError, 
  TransactionError 
} = require('./src/errors');

// Exporting all the imported utilities and error classes as a single object
module.exports = {
  // Utilities from utils
  AddressUtils, 
  BigIntUtils, 
  FormatUtils, 
  HexUtils, 
  NumberUtils, 
  ValidationUtils,

  // Encoding utilities
  ABIUtils, 
  JSONUtils, 
  StringUtils, 
  RLP,

  // Custom error classes
  ConnectionError, 
  InvalidArgumentError, 
  RpcError, 
  TransactionError,
};

