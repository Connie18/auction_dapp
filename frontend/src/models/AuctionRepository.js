import Config from "../config";

export class AuctionRepository {
    web3 = null;
    account = "";
    contractInstance = null;
    gas = 4476768;

    constructor() {
        this.gas = Config.GAS_AMOUNT;
    }

    setWeb3(web3) {
        this.web3 = web3;
        this.contractInstance = new web3.eth.Contract(
            Config.AUCTIONREPOSITORY_ABI,
            Config.AUCTIONREPOSITORY_ADDRESS
        );
    }

    getWeb3() {
        return this.web3;
    }

    setAccount(account) {
        this.account = account;
    }

    getCurrentBlock() {
        return this.web3.eth.getBlockNumber();
    }

    async watchIfCreated(cb) {
        const currentBlock = await this.getCurrentBlock();
        this.contractInstance.events.AuctionCreated(
            { fromBlock: currentBlock },
            cb
        );
    }

    async watchIfBidSuccess(cb) {
        const currentBlock = await this.getCurrentBlock();
        this.contractInstance.events.BidSuccess(
            { fromBlock: currentBlock },
            cb
        );
    }

    async watchIfCanceled(cb) {
        const currentBlock = await this.getCurrentBlock();
        this.contractInstance.events.AuctionCanceled(
            { fromBlock: currentBlock },
            cb
        );
    }

    async watchIfFinalized(cb) {
        const currentBlock = await this.getCurrentBlock();
        this.contractInstance.events.AuctionFinalized(
            { fromBlock: currentBlock },
            cb
        );
    }

    getCurrentBid(auctionId) {
        return this.contractInstance.methods
            .getCurrentBid(auctionId)
            .call({ from: this.account });
    }

    getBidCount(auctionId) {
        return this.contractInstance.methods
            .getBidsCount(auctionId)
            .call({ from: this.account });
    }

    getCount() {
        return this.contractInstance.methods
            .getCount()
            .call({ from: this.account });
    }

    bid(auctionId, price) {
        return this.contractInstance.methods.bidOnAuction(auctionId).send({
            from: this.account,
            gas: this.gas,
            value: this.web3.utils.toWei(price, "ether"),
        });
    }

    create(deedId, auctionTitle, metadata, startingPrice, blockDeadline) {
        return this.contractInstance.methods
            .createAuction(
                Config.DEEDREPOSITORY_ADDRESS,
                deedId,
                auctionTitle,
                metadata,
                this.web3.utils.toWei(startingPrice, "ether"),
                blockDeadline
            )
            .send({ from: this.account, gas: this.gas });
    }

    cancel(auctionId) {
        return this.contractInstance.methods
            .cancelAuction(auctionId)
            .send({ from: this.account, gas: this.gas });
    }

    finalize(auctionId) {
        return this.contractInstance.methods
            .finalizeAuction(auctionId)
            .send({ from: this.account, gas: this.gas });
    }

    findById(auctionId) {
        return this.contractInstance.methods
            .getAuctionById(auctionId)
            .call({ from: this.account });
    }
}
