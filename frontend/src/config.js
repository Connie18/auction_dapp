var DeedRepository = require("./contracts/DeedRepository");
var AuctionRepository = require("./contracts/AuctionRepository");

module.exports = {
    BZZ_ENDPOINT: "http://localhost:8500",
    SHH_ENDPOINT: "ws://localhost:12345",

    // For local testing as Ganache
    // DEEDREPOSITORY_ADDRESS: "0xC3daB6B7c84b0342607D5904b7214b7F1E3DAad6",
    // AUCTIONREPOSITORY_ADDRESS: "0x29a412B146aAe61A0256707065cb94Bd4fcC6c8b",

    // For testing as Sepolia
    DEEDREPOSITORY_ADDRESS: "0x812Ce7195D9fCafcF644e545951119523258B81a",
    AUCTIONREPOSITORY_ADDRESS: "0x330a328470741193641b3B77b64FDd6a5249aB64",

    DEEDREPOSITORY_ABI: DeedRepository.abi,
    AUCTIONREPOSITORY_ABI: AuctionRepository.abi,

    GAS_AMOUNT: 500000,

    //whisper settings
    WHISPER_SHARED_KEY:
        "0x8bda3abeb454847b515fa9b404cede50b1cc63cfdeddd4999d074284b4c21e15",
};
