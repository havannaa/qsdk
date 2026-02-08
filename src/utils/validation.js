// src/utils/validation.js

class ValidationUtils {
  /**
   * Validates if a string is a valid Quantova address.
   * 
   * @param {string} address - The address to validate.
   * @returns {boolean} - Returns true if the address is valid, otherwise false.
   */
  static isAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  /**
   * Validates if a string is a valid Quantova private key (64 hex characters, with or without 0x prefix).
   * 
   * @param {string} privateKey - The private key to validate.
   * @returns {boolean} - Returns true if the private key is valid, otherwise false.
   */
  static isPrivateKey(privateKey) {
    return /^0x[0-9a-fA-F]{64}$/.test(privateKey) || /^[0-9a-fA-F]{64}$/.test(privateKey);
  }

  /**
   * Validates if a string is a valid Quantova transaction hash (32-byte hexadecimal string with 0x prefix).
   * 
   * @param {string} txHash - The transaction hash to validate.
   * @returns {boolean} - Returns true if the transaction hash is valid, otherwise false.
   */
  static isTxHash(txHash) {
    return /^0x[0-9a-fA-F]{64}$/.test(txHash);
  }

  /**
   * Validates if a value is a valid number (integer or float).
   * 
   * @param {any} value - The value to validate.
   * @returns {boolean} - Returns true if the value is a valid number, otherwise false.
   */
  static isNumber(value) {
    return !isNaN(value) && isFinite(value);
  }

  /**
   * Validates if a string is a valid hexadecimal string (with 0x prefix).
   * 
   * @param {string} hex - The string to validate.
   * @returns {boolean} - Returns true if the string is valid hex, otherwise false.
   */
  static isHex(hex) {
    return /^0x[0-9a-fA-F]+$/.test(hex);
  }

  /**
   * Validates if a string is a valid Quantova ENS name.
   * 
   * @param {string} ensName - The ENS name to validate.
   * @returns {boolean} - Returns true if the ENS name is valid, otherwise false.
   */
  static isENSName(ensName) {
    return /^[a-z0-9-]+\.eth$/.test(ensName);
  }

  /**
   * Validates if a string is a valid URL.
   * 
   * @param {string} url - The URL to validate.
   * @returns {boolean} - Returns true if the URL is valid, otherwise false.
   */
  static isURL(url) {
    const pattern = new RegExp(
      '^(https?:\\/\\/)?' + // Optional http:// or https://
      '((([A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?)\\.)+(?:[A-Z0-9-]+[A-Z0-9])' + // Domain name and extension
      '|localhost|' + // Or localhost
      '(([0-9]{1,3}\\.){3}[0-9]{1,3}))' + // Or IP address
      '(\\:[0-9]+)?(\\/[-A-Z0-9+&@#/%=~_|$?!,.;]*)*' + // Port and path
      '(\\?[;&A-Z0-9+%$=~_|-]*)?' + // Query string
      '(\\#[-A-Z0-9_&=%$@!~]*$)?',
      'i'
    );
    return pattern.test(url);
  }

  /**
   * Validates if a string is a valid email address.
   * 
   * @param {string} email - The email address to validate.
   * @returns {boolean} - Returns true if the email is valid, otherwise false.
   */
  static isEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  /**
   * Validates if a string is a valid hexadecimal number (i.e., hex without `0x` prefix).
   * 
   * @param {string} hex - The hex number to validate.
   * @returns {boolean} - Returns true if the string is valid hex, otherwise false.
   */
  static isValidHexNumber(hex) {
    return /^[0-9a-fA-F]+$/.test(hex);
  }

  /**
   * Validates if a string is a valid Quantova gas price (integer, no decimals).
   * 
   * @param {string} gasPrice - The gas price to validate.
   * @returns {boolean} - Returns true if the gas price is valid, otherwise false.
   */
  static isGasPrice(gasPrice) {
    return /^[0-9]+$/.test(gasPrice); // Gas price must be a positive integer
  }
}

module.exports = ValidationUtils;

