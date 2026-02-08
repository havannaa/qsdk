// src/encoding/abi.js

const keccak256 = require('keccak'); // keccak256 for hashing
const { isHex } = require('../utils/hex'); // Hex validation utility

class ABIUtils {

  /**
   * Encodes a single value for ABI encoding.
   * Supports uint256, string, bool, address, etc.
   * 
   * @param {string} type - The type of the value (e.g., "uint256", "string", "address").
   * @param {any} value - The value to encode.
   * @returns {string} - The ABI-encoded value as a hex string.
   * @throws {Error} - Throws an error if the type is unsupported.
   */
  static encodeParameter(type, value) {
    switch (type) {
      case 'uint256':
        return this.encodeUInt256(value);
      case 'string':
        return this.encodeString(value);
      case 'bool':
        return this.encodeBool(value);
      case 'address':
        return this.encodeAddress(value);
      case 'bytes32':
        return this.encodeBytes32(value);
      case 'bytes':
        return this.encodeBytes(value);
      default:
        throw new Error(`Unsupported ABI type: ${type}`);
    }
  }

  /**
   * Encodes a uint256 value.
   * 
   * @param {number|string|BigInt} value - The value to encode.
   * @returns {string} - The ABI-encoded uint256 value as a hex string.
   */
  static encodeUInt256(value) {
    const bigIntValue = BigInt(value);
    if (bigIntValue < 0) throw new Error('Value must be a positive integer');
    return bigIntValue.toString(16).padStart(64, '0');
  }

  /**
   * Encodes a string value.
   * 
   * @param {string} value - The string to encode.
   * @returns {string} - The ABI-encoded string as a hex string.
   */
  static encodeString(value) {
    const hexValue = Buffer.from(value, 'utf8').toString('hex');
    return hexValue.padStart(64, '0'); // Ensure 32-byte length
  }

  /**
   * Encodes a boolean value.
   * 
   * @param {boolean} value - The boolean to encode.
   * @returns {string} - The ABI-encoded boolean as a hex string.
   */
  static encodeBool(value) {
    return value ? '0000000000000000000000000000000000000000000000000000000000000001' : '0000000000000000000000000000000000000000000000000000000000000000';
  }

  /**
   * Encodes an address.
   * 
   * @param {string} address - The address to encode.
   * @returns {string} - The ABI-encoded address as a hex string.
   * @throws {Error} - Throws an error if the address is invalid.
   */
  static encodeAddress(address) {
    if (!isHex(address) || address.length !== 42) {
      throw new Error('Invalid Quantova address');
    }
    return address.slice(2).padStart(64, '0'); // Remove the 0x prefix and ensure 32-byte length
  }

  /**
   * Encodes a bytes32 value.
   * 
   * @param {string} value - The bytes32 value to encode.
   * @returns {string} - The ABI-encoded bytes32 as a hex string.
   */
  static encodeBytes32(value) {
    // Check if the length of the value is 64 characters (32 bytes)
    if (value.length !== 64) {
      throw new Error('Value must be 32 bytes (64 hex characters)');
    }

    // Ensure the value is a valid hex string
    if (!isHex(value)) {
      throw new Error('Value must be a valid hex string');
    }

    return value; // Return the value as it is (already 64 hex characters long)
  }

  /**
   * Encodes arbitrary bytes data.
   * 
   * @param {string} value - The bytes data to encode.
   * @returns {string} - The ABI-encoded bytes as a hex string.
   * @throws {Error} - Throws an error if the input is invalid.
   */
  static encodeBytes(value) {
    if (typeof value !== 'string' || !isHex(value)) {
      throw new Error('Value must be a hex string');
    }
    return value.padStart(64, '0'); // Ensure proper padding
  }

  /**
   * Decodes a single ABI-encoded value.
   * Supports decoding uint256, string, bool, address, etc.
   * 
   * @param {string} type - The type of the value (e.g., "uint256", "string", "address").
   * @param {string} encodedValue - The ABI-encoded value to decode.
   * @returns {any} - The decoded value.
   * @throws {Error} - Throws an error if the type is unsupported.
   */
  static decodeParameter(type, encodedValue) {
    switch (type) {
      case 'uint256':
        return this.decodeUInt256(encodedValue);
      case 'string':
        return this.decodeString(encodedValue);
      case 'bool':
        return this.decodeBool(encodedValue);
      case 'address':
        return this.decodeAddress(encodedValue);
      case 'bytes32':
        return this.decodeBytes32(encodedValue);
      case 'bytes':
        return this.decodeBytes(encodedValue);
      default:
        throw new Error(`Unsupported ABI type: ${type}`);
    }
  }

  /**
   * Decodes a uint256 value.
   * 
   * @param {string} encodedValue - The ABI-encoded uint256 value.
   * @returns {BigInt} - The decoded uint256 value.
   */
  static decodeUInt256(encodedValue) {
    return BigInt('0x' + encodedValue);
  }

  /**
   * Decodes a string value.
   * 
   * @param {string} encodedValue - The ABI-encoded string value.
   * @returns {string} - The decoded string.
   */
  static decodeString(encodedValue) {
    const buffer = Buffer.from(encodedValue, 'hex');
    return buffer.toString('utf8').replace(/\0/g, ''); // Remove padding null bytes
  }

  /**
   * Decodes a boolean value.
   * 
   * @param {string} encodedValue - The ABI-encoded boolean value.
   * @returns {boolean} - The decoded boolean value.
   */
  static decodeBool(encodedValue) {
    return encodedValue === '0000000000000000000000000000000000000000000000000000000000000001';
  }

  /**
   * Decodes an address.
   * 
   * @param {string} encodedValue - The ABI-encoded address value.
   * @returns {string} - The decoded address.
   */
  static decodeAddress(encodedValue) {
    return '0x' + encodedValue.slice(24); // Extract last 20 bytes
  }

  /**
   * Decodes a bytes32 value.
   * 
   * @param {string} encodedValue - The ABI-encoded bytes32 value.
   * @returns {string} - The decoded bytes32 value.
   */
  static decodeBytes32(encodedValue) {
    return encodedValue;
  }

  /**
   * Decodes arbitrary bytes data.
   * 
   * @param {string} encodedValue - The ABI-encoded bytes data.
   * @returns {string} - The decoded bytes data.
   */
  static decodeBytes(encodedValue) {
    return encodedValue;
  }

  /**
   * Generates the function selector for a given function signature.
   * 
   * @param {string} signature - The function signature (e.g., "transfer(address,uint256)").
   * @returns {string} - The function selector (first 4 bytes of the keccak256 hash).
   */
  static generateFunctionSelector(signature) {
    const hash = keccak256('keccak256').update(signature).digest('hex');
    return '0x' + hash.slice(0, 8); // First 4 bytes
  }
}

module.exports = ABIUtils;

