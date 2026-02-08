// src/utils/address.js

const crypto = require('crypto');
const elliptic = require('elliptic');
const keccak256 = require('keccak'); // Use 'keccak' for keccak256 hashing

class AddressUtils {
  /**
   * Checks if a given value is a valid Quantova address.
   * 
   * @param {string} value - The value to be checked.
   * @returns {boolean} - Returns true if the value is a valid Quantova address.
   */
  static isAddress(value) {
    return /^0x[a-fA-F0-9]{40}$/.test(value); // Quantova address format
  }

  /**
   * Formats an Quantova address to lowercase.
   * 
   * @param {string} address - The Quantova address to format.
   * @returns {string} - The formatted address in lowercase.
   * @throws {Error} - Throws an error if the address is invalid.
   */
  static formatAddress(address) {
    if (this.isAddress(address)) {
      return address.toLowerCase();
    }
    throw new Error('Invalid Quantova address');
  }

  /**
   * Checks if the address is checksummed.
   * 
   * @param {string} address - The Quantova address to check.
   * @returns {boolean} - Returns true if the address is checksummed.
   */
  static isChecksumAddress(address) {
    return /^0x[0-9a-fA-F]{40}$/.test(address) && address !== address.toLowerCase();
  }

  /**
   * Converts an Quantova address to a checksummed address.
   * 
   * @param {string} address - The Quantova address to checksum.
   * @returns {string} - The checksummed address.
   * @throws {Error} - Throws an error if the address is invalid.
   */
  static toChecksumAddress(address) {
    if (!this.isAddress(address)) {
      throw new Error('Invalid Quantova address');
    }

    // Step 1: Convert address to lowercase
    const addressHash = keccak256('keccak256').update(address.toLowerCase().slice(2)).digest('hex'); // Use Keccak-256 for hashing
    let checksumAddress = '0x';

    // Step 2: Adjust the address casing based on the hash
    for (let i = 0; i < address.length - 2; i++) {
      const char = address[i + 2];
      const hashChar = parseInt(addressHash[i], 16);

      // If the hash character is greater than 7, make the character uppercase
      if (hashChar > 7) {
        checksumAddress += char.toUpperCase();
      } else {
        checksumAddress += char.toLowerCase();
      }
    }

    return checksumAddress;
  }

  /**
   * Validates the checksum of an Quantova address.
   * 
   * @param {string} address - The Quantova address to validate.
   * @returns {boolean} - Returns true if the address has a valid checksum.
   */
  static validateChecksum(address) {
    return address === this.toChecksumAddress(address);
  }

  /**
   * Derives the public address from a given private key using the ECDSA algorithm (secp256k1).
   * 
   * @param {string} privateKey - The private key (hex string starting with '0x').
   * @returns {string} - The Quantova address derived from the private key.
   * @throws {Error} - Throws an error if the private key is invalid.
   */
  static deriveAddressFromPrivateKey(privateKey) {
    if (!/^0x[0-9a-fA-F]{64}$/.test(privateKey)) {
      throw new Error('Invalid private key');
    }

    const publicKey = this.privateKeyToPublicKey(privateKey);
    return this.publicKeyToAddress(publicKey);
  }

  /**
   * Converts a private key to a public key using the secp256k1 curve.
   * 
   * @param {string} privateKey - The private key in hex format.
   * @returns {string} - The corresponding public key in hex format.
   */
  static privateKeyToPublicKey(privateKey) {
    const ec = new elliptic.ec('secp256k1');
    const key = ec.keyFromPrivate(privateKey.slice(2), 'hex');
    return key.getPublic(true, 'hex').slice(2); // Remove the 0x prefix from the public key
  }

  /**
   * Converts a public key to an Quantova address.
   * 
   * @param {string} publicKey - The public key (hex string).
   * @returns {string} - The corresponding Quantova address.
   */
  static publicKeyToAddress(publicKey) {
    const address = keccak256('keccak256').update(Buffer.from(publicKey, 'hex')).digest('hex').slice(24); // Keccak-256 hash of the public key
    return `0x${address}`;
  }
}

// Export the AddressUtils class
module.exports = AddressUtils;

