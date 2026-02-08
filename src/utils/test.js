const AddressUtils = require('./address');
const BigIntUtils = require('./bigInt');
const FormatUtils = require('./format');
const HexUtils = require('./hex');
const NumberUtils = require('./number');
const ValidationUtils = require('./validation');

// Test the AddressUtils module
console.log("-- Test the AddressUtils module")
// Test address validation
const validAddress = '0x32Be343B94f860124dC4fEe278FDCBD38C102D88';
const invalidAddress = '0x12345';

console.log(AddressUtils.isAddress(validAddress)); // true
console.log(AddressUtils.isAddress(invalidAddress)); // false

// Test address formatting
console.log(AddressUtils.formatAddress(validAddress)); // all lowercase

// Test checksum validation and conversion
const checksumAddress = '0x32Be343B94f860124dC4fEe278FDCBD38C102D88';
const nonChecksumAddress = '0x32be343b94f860124dc4fee278fdcbd38c102d88';
console.log(AddressUtils.validateChecksum(checksumAddress)); // true
console.log(AddressUtils.validateChecksum(nonChecksumAddress)); // false

// Test address conversion from private key
const privateKey = '0x4c0883a6910395b8e0f2f7e3f1c3b2c3b9b9c5192a513e0a4e3ff1b609d9e9c4';
const derivedAddress = AddressUtils.deriveAddressFromPrivateKey(privateKey);
console.log(derivedAddress); // Quantova address derived from private key

// Test the BigIntUtils module
console.log("-- Test the BigIntUtils module")
// Test conversion to BigInt
console.log(BigIntUtils.toBigInt('1000000000000000000')); // BigInt('1000000000000000000')
console.log(BigIntUtils.toBigInt(1000)); // BigInt(1000)
console.log(BigIntUtils.toBigInt(BigInt(1000))); // BigInt(1000)

// Test toHex
console.log(BigIntUtils.toHex('1000000000000000000')); // "0xde0b6b3a7640000"

// Test fromHex
console.log(BigIntUtils.fromHex('0xde0b6b3a7640000')); // BigInt(1000000000000000000)

// Test arithmetic
console.log(BigIntUtils.add(100, 200)); // BigInt(300)
console.log(BigIntUtils.subtract(500, 200)); // BigInt(300)
console.log(BigIntUtils.multiply(100, 2)); // BigInt(200)
console.log(BigIntUtils.divide(1000, 4)); // BigInt(250)
console.log(BigIntUtils.mod(1000, 3)); // BigInt(1)

// Test min and max
console.log(BigIntUtils.min(1000, 500)); // BigInt(500)
console.log(BigIntUtils.max(1000, 500)); // BigInt(1000)

// Test formatBigInt
console.log(BigIntUtils.formatBigInt('1000000000000000000000000')); // "1,000,000,000,000,000,000,000,000"

// Test the FormatUtils module
console.log("-- Test the FormatUtils module")
// Test Wei to Ether conversion
console.log(FormatUtils.weiToEther('1000000000000000000')); // "1"
console.log(FormatUtils.weiToEther(1000000000000000000)); // "1"

// Test formatting numbers
console.log(FormatUtils.formatNumber('1000000000000000000000000')); // "1,000,000,000,000,000,000,000,000"
console.log(FormatUtils.formatNumber(1000000000000000000)); // "1,000,000,000,000,000"

// Test date formatting
console.log(FormatUtils.formatDate('2023-10-01T14:48:00.000Z')); // "2023-10-01 14:48:00"

// Test decimal formatting
console.log(FormatUtils.formatDecimals(25.123456789, 2)); // "25.12"
console.log(FormatUtils.formatDecimals('25.123456789', 3)); // "25.123"

// Test percentage conversion
console.log(FormatUtils.toPercentage(0.25)); // "25.00%"
console.log(FormatUtils.toPercentage(0.5, 1)); // "50.0%"

// Test Unix timestamp to date conversion
console.log(FormatUtils.timestampToDate(1633046400)); // "2021-10-01 00:00:00"


// Test the HexUtils module
console.log("-- Test the HexUtils module")

// Test string to hex conversion
console.log(HexUtils.stringToHex('Hello')); // "0x48656c6c6f"

// Test hex to string conversion
console.log(HexUtils.hexToString('0x48656c6c6f')); // "Hello"

// Test number to hex conversion
console.log(HexUtils.numberToHex(255)); // "0xff"

// Test BigInt to hex conversion
console.log(HexUtils.bigIntToHex(BigInt('1000000000000000000'))); // "0xde0b6b3a7640000"

// Test hex to BigInt conversion
console.log(HexUtils.hexToBigInt('0xde0b6b3a7640000')); // 1000000000000000000n

// Test hex validity check
console.log(HexUtils.isHex('0xde0b6b3a7640000')); // true
console.log(HexUtils.isHex('0xINVALIDHEX')); // false

// Test padding hex string
console.log(HexUtils.padHex('0xde0b6b3a7640000', 34)); // "0x00de0b6b3a7640000"

// Test remove prefix
console.log(HexUtils.removePrefix('0xde0b6b3a7640000')); // "de0b6b3a7640000"

// Test the NumberUtils module
console.log("-- Test the NumberUtils module")

// Test toHex conversion
console.log(NumberUtils.toHex(255)); // "0xff"
console.log(NumberUtils.toHex('255')); // "0xff"
console.log(NumberUtils.toHex(BigInt('255'))); // "0xff"

// Test toNumber conversion
console.log(NumberUtils.toNumber('1000')); // 1000
console.log(NumberUtils.toNumber(1000)); // 1000
console.log(NumberUtils.toNumber(BigInt('1000'))); // 1000

// Test rounding
console.log(NumberUtils.round(25.123456789, 2)); // "25.12"
console.log(NumberUtils.round('25.123456789', 3)); // "25.123"

// Test percentage conversion
console.log(NumberUtils.toPercentage(0.25)); // "25.00%"
console.log(NumberUtils.toPercentage(0.5, 1)); // "50.0%"

// Test converting percentage to decimal
console.log(NumberUtils.percentageToDecimal('25%')); // 0.25
console.log(NumberUtils.percentageToDecimal('50.0%')); // 0.5

// Test max and min
console.log(NumberUtils.max(1000, 500)); // 1000
console.log(NumberUtils.min(1000, 500)); // 500

// Test fixed-point number conversion
console.log(NumberUtils.toFixed(1000.123456, 2)); // 1000.12

// Test the ValidationUtils module
console.log("-- Test the ValidationUtils module")

// Test Quantova address validation
console.log(ValidationUtils.isAddress('0x32Be343B94f860124dC4fEe278FDCBD38C102D88')); // true
console.log(ValidationUtils.isAddress('0x12345')); // false

// Test private key validation
console.log(ValidationUtils.isPrivateKey('0x4c0883a6910395b8e0f2f7e3f1c3b2c3b9b9c5192a513e0a4e3ff1b609d9e9c4')); // true
console.log(ValidationUtils.isPrivateKey('0xINVALIDPRIVATEKEY')); // false

// Test transaction hash validation
console.log(ValidationUtils.isTxHash('0x9f6f6a7bb71b70f1f9b8c9db303f9b8bc75de9e9b9e6f7be429fbeb464ee0dd1')); // true
console.log(ValidationUtils.isTxHash('0xINVALIDTXHASH')); // false

// Test number validation
console.log(ValidationUtils.isNumber(123)); // true
console.log(ValidationUtils.isNumber('123.45')); // true
console.log(ValidationUtils.isNumber('abc')); // false

// Test hex string validation
console.log(ValidationUtils.isHex('0xde0b6b3a7640000')); // true
console.log(ValidationUtils.isHex('0xINVALIDHEX')); // false

// Test ENS name validation
console.log(ValidationUtils.isENSName('example.eth')); // true
console.log(ValidationUtils.isENSName('example.com')); // false

// Test URL validation
console.log(ValidationUtils.isURL('https://www.example.com')); // true
console.log(ValidationUtils.isURL('invalid-url')); // false

// Test email validation
console.log(ValidationUtils.isEmail('test@example.com')); // true
console.log(ValidationUtils.isEmail('invalid-email')); // false

// Test valid hex number
console.log(ValidationUtils.isValidHexNumber('a1b2c3')); // true
console.log(ValidationUtils.isValidHexNumber('a1b2g3')); // false

// Test gas price validation
console.log(ValidationUtils.isGasPrice('100000')); // true
console.log(ValidationUtils.isGasPrice('100000.5')); // false

