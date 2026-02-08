// src/encoding/json.js

const { isHex } = require('../utils/hex'); // Hex validation utility
const ABIUtils = require('./abi'); // Import ABIUtils class

class JSONUtils {

  /**
   * Encodes a JSON object or array to ABI-compatible format.
   * This function will traverse the input and encode each parameter
   * to ensure it is ABI-compatible.
   * 
   * @param {Object|Array} value - The JSON object or array to encode.
   * @returns {string} - The ABI-encoded JSON value as a hex string.
   */
  static encodeJSON(value) {
    if (Array.isArray(value)) {
      return this.encodeArray(value);
    } else if (typeof value === 'object') {
      return this.encodeObject(value);
    } else {
      throw new Error('Value must be an object or an array');
    }
  }

  /**
   * Encodes a JSON array to ABI-compatible format.
   * 
   * @param {Array} value - The JSON array to encode.
   * @returns {string} - The ABI-encoded array as a hex string.
   */
  static encodeArray(value) {
    let encoded = '';
    value.forEach(item => {
      encoded += ABIUtils.encodeParameter(this.getType(item), item);  // Use ABIUtils.encodeParameter
    });
    return encoded;
  }

  /**
   * Encodes a JSON object to ABI-compatible format.
   * It will encode each key-value pair in the object.
   * 
   * @param {Object} value - The JSON object to encode.
   * @returns {string} - The ABI-encoded object as a hex string.
   */
  static encodeObject(value) {
    let encoded = '';
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        const type = this.getType(value[key]);
        encoded += ABIUtils.encodeParameter(type, value[key]);  // Use ABIUtils.encodeParameter
      }
    }
    return encoded;
  }

  /**
   * Decodes a JSON ABI-encoded string back to its original object/array format.
   * 
   * @param {string} encodedValue - The ABI-encoded JSON string.
   * @param {Object|Array} type - The type of the expected output (either Object or Array).
   * @returns {Object|Array} - The decoded value in its original form.
   */
  static decodeJSON(encodedValue, type) {
    if (Array.isArray(type)) {
      return this.decodeArray(encodedValue, type);
    } else if (typeof type === 'object') {
      return this.decodeObject(encodedValue, type);
    } else {
      throw new Error('Type must be an object or an array');
    }
  }

  /**
   * Decodes an ABI-encoded array back to its original array form.
   * 
   * @param {string} encodedValue - The ABI-encoded array string.
   * @param {Array} type - The type array to decode (e.g., ['uint256', 'string']).
   * @returns {Array} - The decoded array.
   */
  static decodeArray(encodedValue, type) {
    let decoded = [];
    let offset = 0;
    type.forEach(t => {
      const itemLength = this.getItemLength(t);
      decoded.push(ABIUtils.decodeParameter(t, encodedValue.slice(offset, offset + itemLength)));  // Use ABIUtils.decodeParameter
      offset += itemLength;
    });
    return decoded;
  }

  /**
   * Decodes an ABI-encoded object back to its original object form.
   * 
   * @param {string} encodedValue - The ABI-encoded object string.
   * @param {Object} type - The type object to decode (e.g., { key1: 'uint256', key2: 'string' }).
   * @returns {Object} - The decoded object.
   */
  static decodeObject(encodedValue, type) {
    let decoded = {};
    let offset = 0;
    for (const key in type) {
      if (type.hasOwnProperty(key)) {
        const itemLength = this.getItemLength(type[key]);
        decoded[key] = ABIUtils.decodeParameter(type[key], encodedValue.slice(offset, offset + itemLength));  // Use ABIUtils.decodeParameter
        offset += itemLength;
      }
    }
    return decoded;
  }

  /**
   * Get the ABI type of a value. This function checks the type of the value
   * and returns the corresponding ABI type string.
   * 
   * @param {any} value - The value whose type is to be determined.
   * @returns {string} - The ABI type string (e.g., "uint256", "address", "string").
   */
  static getType(value) {
    if (typeof value === 'number') {
      return 'uint256';
    } else if (typeof value === 'string') {
      return 'string';
    } else if (typeof value === 'boolean') {
      return 'bool';
    } else if (Array.isArray(value)) {
      return 'bytes[]'; // Array of bytes, or other array type
    } else if (isHex(value)) {
      return 'bytes32'; // Handle hex as bytes32 type
    } else {
      throw new Error('Unsupported type');
    }
  }

  /**
   * Get the length of an ABI-encoded item.
   * 
   * @param {string} type - The type of the ABI parameter (e.g., 'uint256', 'string').
   * @returns {number} - The length of the ABI-encoded item in hex characters.
   */
  static getItemLength(type) {
    switch (type) {
      case 'uint256':
      case 'address':
      case 'bool':
      case 'bytes32':
        return 64; // 32 bytes = 64 hex chars
      case 'string':
      case 'bytes':
        return 64; // You can adjust this based on string/bytes length
      default:
        throw new Error(`Unsupported type length: ${type}`);
    }
  }
}

module.exports = JSONUtils;

