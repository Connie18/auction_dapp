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
  },
};
