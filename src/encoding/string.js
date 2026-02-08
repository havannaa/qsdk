// src/encoding/string.js

class StringUtils {

  /**
   * Encodes a string to its hexadecimal representation (UTF-8 encoding).
   * This is commonly used for encoding strings to send in transactions or store in smart contracts.
   * 
   * @param {string} value - The string to encode.
   * @returns {string} - The hex-encoded string, with the `0x` prefix.
   */
  static encode(value) {
    if (typeof value !== 'string') {
      throw new Error('Input must be a string');
    }

    // Convert the string to a buffer and then to hex format
    return '0x' + Buffer.from(value, 'utf8').toString('hex');
  }

  /**
   * Decodes a hex-encoded string (UTF-8 decoding).
   * Converts the hex string back into a readable string.
   * 
   * @param {string} hexValue - The hex string to decode.
   * @returns {string} - The decoded string.
   * @throws {Error} - Throws an error if the input is not a valid hex string.
   */
  static decode(hexValue) {
    // Add check for '0x' prefix and remove it if present
    if (hexValue.startsWith('0x')) {
      hexValue = hexValue.slice(2); // Remove '0x' prefix
    }

    if (!this.isValidHex(hexValue)) {
      throw new Error('Invalid hex string');
    }

    // Convert the hex string back into a buffer and then to a UTF-8 string
    const buffer = Buffer.from(hexValue, 'hex');
    return buffer.toString('utf8');
  }

  /**
   * Checks if a given string is a valid hexadecimal string (starts with 0x and contains only hex characters).
   * 
   * @param {string} hex - The string to check.
   * @returns {boolean} - True if the string is valid hex, otherwise false.
   */
  static isValidHex(hex) {
    // Check if the hex string consists only of valid hex characters (a-f, A-F, 0-9)
    return /^[0-9a-fA-F]+$/.test(hex);
  }

  /**
   * Pads a string to ensure it has an even number of characters for encoding.
   * This is useful when encoding strings that must have an even length.
   * 
   * @param {string} value - The string to pad.
   * @returns {string} - The padded string.
   */
  static padString(value) {
    if (value.length % 2 !== 0) {
      return '0' + value;  // Add a leading zero if the string's length is odd
    }
    return value;
  }

  /**
   * Converts a string to a UTF-8 byte array.
   * This byte array is useful when dealing with raw data (e.g., smart contract inputs).
   * 
   * @param {string} value - The string to convert.
   * @returns {Buffer} - The UTF-8 encoded byte array.
   */
  static stringToBytes(value) {
    return Buffer.from(value, 'utf8');
  }
}

// Export the StringUtils class
module.exports = StringUtils;

