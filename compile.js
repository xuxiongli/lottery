//编译智能合约的脚本
const path = require('path');
const fs = require('fs');
const solc = require('solc');

const resolve = path.resolve(__dirname,'contracts','Lottery.sol');
const fileSync = fs.readFileSync(resolve,'utf-8');

const result = solc.compile(fileSync,1);

console.log(result);

module.exports = result.contracts[':Lottery'];
