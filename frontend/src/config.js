var DeedRepository = require("./contracts/DeedRepository");
var AuctionRepository = require("./contracts/AuctionRepository");

module.exports = {
    JSONRPC_ENDPOINT: "http://localhost:7545",
    JSONRPC_WS_ENDPOINT: "ws://localhost:7545",
    BZZ_ENDPOINT: "http://localhost:8500",
    SHH_ENDPOINT: "ws://localhost:7545",

    DEEDREPOSITORY_ADDRESS: "0xC3daB6B7c84b0342607D5904b7214b7F1E3DAad6",
    AUCTIONREPOSITORY_ADDRESS: "0x29a412B146aAe61A0256707065cb94Bd4fcC6c8b",

    DEEDREPOSITORY_ABI: DeedRepository.abi,
    AUCTIONREPOSITORY_ABI: AuctionRepository.abi,

    GAS_AMOUNT: 500000,

    //whisper settings
    WHISPER_SHARED_KEY:
        "0x8bda3abeb454847b515fa9b404cede50b1cc63cfdeddd4999d074284b4c21e15",
};

// web3.eth.sendTransaction({from: web3.eth.accounts[0], to: "0x6f0023D1CFe5A7A56F96e61E0169B775Ac97f90E" , value: web3.utils.toWei(1, 'ether'), gasLimit: 21000, gasPrice: 20000000000})
