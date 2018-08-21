const ganache = require('ganache-cli');
const {interface,bytecode} = require('../compile');
const assert = require('assert');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

let contract;
let accounts;

// beforEach(async () => {
// //
// // });


describe('测试彩票合约', () => {

    it('测试部署编译', async () => {
        accounts = await new web3.eth.getAccounts();
        contract = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({
                data:bytecode
            }).send({
                from:accounts[0],
                gas:'3000000'
            });
        console.log(await web3.eth.getAccounts().then(accounts[0]));
        console.log(contract.options.address);
        assert.ok(contract.options.address);
    });


});