require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require("truffle-hdwallet-provider");

const mnemonic = "outside bridge shrimp above piece myth acquire doll void filter fit reject";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: () => new HDWalletProvider(
        mnemonic,
        "https://ropsten.infura.io/v3/e8cc7c8e245b46b482873ce9382a542b"
      ),
      network_id: 3,
      gas: 4700000
    },
    main: {
      provider: () => new HDWalletProvider(
        "976b9d6972ea4ba3ba311f823564ed50",
        "https://mainnet.infura.io/v3/e8cc7c8e245b46b482873ce9382a542b",
      ),
      network_id: 5,
      gas: 4700000
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
