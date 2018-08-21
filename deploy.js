//部署到真实网络
const Web3 = require('web3');
const {interface,bytecode} = require('./compile');
const HdWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = "wasp trim multiply vivid improve nose pig boring seminar immune bulk wild"; // 12 word mnemonic
const provider = new HdWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/b00a32b6306a4d5db38f7d78593da5f0");
const web3 = new Web3(provider);

deploy = async () => {
    const accounts = await new web3.eth.getAccounts();
    console.log(accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode
        }).send({
            from: accounts[0],
            gas: '3000000'
        });
    console.log('address' + result.options.address);
    console.log('-------------------------');
    console.log(interface);
};

deploy();