const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

const sourceFileName = '明文源吗';
const outputFileName = '少年你相信光吗';
const sourceFilePath = path.join(process.cwd(), sourceFileName);

if (!fs.existsSync(sourceFilePath)) {
  console.error('Error: source file not found at ' + sourceFilePath);
  process.exit(1);
}

const originalCode = fs.readFileSync(sourceFilePath, 'utf8');

if (!originalCode || originalCode.trim().length === 0) {
  console.error('Error: source file ' + sourceFileName + ' is empty.');
  process.exit(1);
}

const obfuscationOptions = {
    compact: true,
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0,
    deadCodeInjection: false,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 1.0,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChainedCalls: false,
    stringArrayWrappersParametersMaxCount: 3,
    renameGlobals: true,
    identifierNamesGenerator: 'mangled-shuffled',
    identifierNamesCache: null,
    identifiersPrefix: '',
    renameProperties: false,
    renamePropertiesMode: 'safe',
    ignoreImports: false,
    target: 'browser',
    numbersToExpressions: false,
    simplify: false,
    splitStrings: true,
    splitStringsChunkLength: 1,
    transformObjectKeys: false,
    unicodeEscapeSequence: true,
    selfDefending: false,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: true,
    domainLock: []
};

const obfuscatedCode = JavaScriptObfuscator.obfuscate(originalCode, obfuscationOptions).getObfuscatedCode();

fs.writeFileSync(path.join(process.cwd(), outputFileName), obfuscatedCode, 'utf8');
console.log('Successfully obfuscated \'' + sourceFileName + '\' → \'' + outputFileName + '\'');
