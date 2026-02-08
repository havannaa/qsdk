// src/encoding/rlp.js

class RLP {

  /**
   * Encodes a given value using RLP encoding.
   * Supports encoding strings, numbers, arrays, and nested arrays.
   * 
   * @param {any} value - The value to encode (can be string, number, array, etc.).
   * @returns {string} - The RLP-encoded value as a hex string.
   */
  static encode(value) {
    if (typeof value === 'number') {
      return this.encodeNumber(value);
    } else if (typeof value === 'string') {
      return this.encodeString(value);
    } else if (Array.isArray(value)) {
      return this.encodeList(value);
    } else {
      throw new Error('Unsupported type for RLP encoding');
    }
  }

  /**
   * Encodes a number using RLP encoding.
   * 
   * @param {number} value - The number to encode.
   * @returns {string} - The RLP-encoded number as a hex string.
   */
  static encodeNumber(value) {
    if (value < 0) throw new Error('Cannot encode negative numbers');
    
    let hexValue = value.toString(16);
    // Single byte case (0-0x7f)
    if (value <= 0x7f) {
      return `0x${hexValue}`;
    }
    
    // Longer value case, prefix with the length
    return `0x${this.intToHex(value)}`;
  }

  /**
   * Encodes a string value using RLP encoding.
   * 
   * @param {string} value - The string to encode.
   * @returns {string} - The RLP-encoded string as a hex string.
   */
  static encodeString(value) {
    const buffer = Buffer.from(value, 'utf8');
    if (buffer.length === 1 && buffer[0] <= 0x7f) {
      return `0x${buffer.toString('hex')}`;
    }

    // For longer strings, use length prefix
    return `0x${this.intToHex(buffer.length)}${buffer.toString('hex')}`;
  }

  /**
   * Encodes an array using RLP encoding.
   * 
   * @param {Array} value - The array to encode.
   * @returns {string} - The RLP-encoded array as a hex string.
   */
  static encodeList(value) {
    let encodedList = value.map(item => this.encode(item).slice(2));  // Remove '0x' prefix from each item
    let listLength = encodedList.join('').length / 2;
    let lengthPrefix = this.intToHex(listLength);
    return `0x${lengthPrefix}${encodedList.join('')}`;
  }

  /**
   * Decodes a RLP-encoded value.
   * Supports decoding strings, numbers, and lists.
   * 
   * @param {string} hexString - The RLP-encoded hex string.
   * @returns {any} - The decoded value (number, string, array, etc.).
   */
  static decode(hexString) {
    if (hexString.length < 2) {
      throw new Error('Hex string must be at least 2 characters long');
    }

    // Remove 0x prefix
    hexString = hexString.slice(2);

    const firstByte = parseInt(hexString[0], 16);
    if (firstByte <= 0x7f) {
      return this.decodeString(hexString);
    }

    // Check for list encoding
    if (firstByte >= 0xc0) {
      return this.decodeList(hexString);
    }

    throw new Error('Unsupported RLP format');
  }

  /**
   * Decodes a number from RLP encoding.
   * 
   * @param {string} hexString - The RLP-encoded number.
   * @returns {number} - The decoded number.
   */
  static decodeNumber(hexString) {
    return parseInt(hexString, 16);
  }

  /**
   * Decodes a string from RLP encoding.
   * 
   * @param {string} hexString - The RLP-encoded string.
   * @returns {string} - The decoded string.
   */
  static decodeString(hexString) {
    return Buffer.from(hexString, 'hex').toString('utf8');
  }

  /**
   * Decodes a list from RLP encoding.
   * 
   * @param {string} hexString - The RLP-encoded list.
   * @returns {Array} - The decoded list.
   */
  static decodeList(hexString) {
    let list = [];
    let index = 0;
    let length = parseInt(hexString.slice(index, index + 2), 16); // Get length of the list
    index += 2;

    while (index < hexString.length) {
      let itemLength = parseInt(hexString.slice(index, index + 2), 16);
      list.push(hexString.slice(index + 2, index + 2 + itemLength)); // Get each item
      index += 2 + itemLength;
    }

    return list;
  }

  /**
   * Converts an integer to its hex representation.
   * 
   * @param {number} value - The value to convert.
   * @returns {string} - The hex string.
   */
  static intToHex(value) {
    let hexValue = value.toString(16);
    return hexValue;
  }
}

// Export the RLP class
module.exports = RLP;

