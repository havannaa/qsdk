const ABIUtils = require('./abi');
const JSONUtils = require('./json');
const RLP = require('./rlp');
const StringUtils = require('./string');

// Example encoding and decoding uint256
console.log("-- ABIUtils")
const encodedUInt256 = ABIUtils.encodeParameter('uint256', '1234567890');
console.log(`Encoded uint256: ${encodedUInt256}`);
const decodedUInt256 = ABIUtils.decodeParameter('uint256', encodedUInt256);
console.log(`Decoded uint256: ${decodedUInt256}`);

// Example encoding and decoding string
const encodedStringABI = ABIUtils.encodeParameter('string', 'Hello, Quantova!');
console.log(`Encoded string: ${encodedStringABI}`);
const decodedStringABI = ABIUtils.decodeParameter('string', encodedStringABI);
console.log(`Decoded string: ${decodedStringABI}`);

// Example encoding and decoding address
const address = '0x32Be343B94f860124dC4fEe278FDCBD38C102D88';
const encodedAddress = ABIUtils.encodeParameter('address', address);
console.log(`Encoded address: ${encodedAddress}`);
const decodedAddress = ABIUtils.decodeParameter('address', encodedAddress);
console.log(`Decoded address: ${decodedAddress}`);

// Example generating function selector
const functionSelector = ABIUtils.generateFunctionSelector('transfer(address,uint256)');
console.log(`Function selector: ${functionSelector}`);

// Example: Encoding a JSON object
console.log("-- JSONUtils")

// Example: Encoding a JSON object with Solidity-like types
console.log("-- JSONUtils for Solidity-like contract")

// Example JSON object mimicking a Solidity function call (e.g., transfer(address,uint256))
const jsonObject = {
  recipient: '0x32Be343B94f860124dC4fEe278FDCBD38C102D88',  // address
  amount: 1000                                       // uint256
};

// Encoding the JSON object (Solidity function-like structure)
const encodedObject = JSONUtils.encodeJSON(jsonObject);
console.log(`Encoded JSON object: ${encodedObject}`);

// Decoding the JSON object back to its original format
const decodedObject = JSONUtils.decodeJSON(encodedObject, { 
  recipient: 'address', 
  amount: 'uint256' 
});
console.log(`Decoded JSON object:`, decodedObject);

// Example: Encoding a JSON array of mixed types (e.g., uint256, string, address)
console.log("\n-- JSONUtils for Encoding Solidity-like Array --");

// Example JSON array mimicking a Solidity contract input
const jsonArray = [1000, 'transfer', '0x32Be343B94f860124dC4fEe278FDCBD38C102D88']; // Example: [uint256, string, address]
const encodedArray = JSONUtils.encodeJSON(jsonArray);
console.log(`Encoded JSON array: ${encodedArray}`);

// Decoding the JSON array back to its original types
const decodedArray = JSONUtils.decodeJSON(encodedArray, ['uint256', 'string', 'address']);
console.log(`Decoded JSON array:`, decodedArray);


// rlp
console.log("-- rlp")


// Test encoding a simple number
const encodedNumber = RLP.encode(123);
console.log(`Encoded number: ${encodedNumber}`);

// Test encoding a string
const encodedStringRLP = RLP.encode("Hello, Quantova!");
console.log(`Encoded string: ${encodedStringRLP}`);

// Test encoding a list of values (number, string, address)
const encodedList = RLP.encode([1000, 'Hello', '0x32Be343B94f860124dC4fEe278FDCBD38C102D88']);
console.log(`Encoded list: ${encodedList}`);

// Test decoding the encoded data back
console.log("\nDecoding the encoded values");

const decodedNumber = RLP.decode(encodedNumber);
console.log(`Decoded number: ${decodedNumber}`);

const decodedStringRLP = RLP.decode(encodedStringRLP);
console.log(`Decoded string: ${decodedStringRLP}`);

const decodedList = RLP.decode(encodedList);
console.log(`Decoded list:`, decodedList);

// string - encoding
console.log("-- string")

// Test case 1: Encoding a string to Hex
const stringToEncode = "Hello, Quantova!";
const encodedString = StringUtils.encode(stringToEncode);
console.log(`Encoded string: ${encodedString}`); // Encodes the string into hex

// Test case 2: Decoding the hex string back to UTF-8
const decodedString = StringUtils.decode(encodedString);
console.log(`Decoded string: ${decodedString}`); // Decodes back to original string

// Test case 3: Padding a string (useful for encoding in Quantova)
const paddedString = StringUtils.padString('abc');
console.log(`Padded string: ${paddedString}`); // Ensures even length for encoding

// Test case 4: Checking if a string is valid hex
console.log(`Is valid hex (valid): ${StringUtils.isValidHex('0x48656c6c6f')}`); // True
console.log(`Is valid hex (invalid): ${StringUtils.isValidHex('0xxyz')}`); // False

// Test case 5: Converting string to bytes (Buffer)
const stringBytes = StringUtils.stringToBytes("Quantova");
console.log(`String as bytes: ${stringBytes.toString('hex')}`); // Convert string to byte array

