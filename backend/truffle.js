require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    dev: {
      network_id: "*",
      host: "localhost",
      port: 8545,
    },
    ganache: {
      network_id: "*",
      host: "localhost",
      port: 7545,
      gas: 6721975,
    },
    sepolia: {
      provider: () =>
        new HDWalletProvider(
          process.env["SEPOLIA_PRIVATE_KEY"],
          `https://eth-sepolia.g.alchemy.com/v2/${process.env["ALCHEMY_API_KEY"]}`
        ),
      network_id: 11155111,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
};
