import Config from "../config";

export class DeedRepository {
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
            Config.DEEDREPOSITORY_ABI,
            Config.DEEDREPOSITORY_ADDRESS
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
        this.contractInstance.events.DeedRegistered(
            { fromBlock: currentBlock },
            (error, event) => {
                if (!error) cb(null, event);
                else cb(error, null);
            }
        );
    }

    async watchIfDeedTransfered(cb) {
        const currentBlock = await this.getCurrentBlock();
        this.contractInstance.events.Transfer(
            { fromBlock: currentBlock },
            (error, event) => {
                if (!error) cb(null, event);
                else cb(error, null);
            }
        );
    }

    exists(deedId) {
        return this.contractInstance.methods
            .exists(deedId)
            .call({ from: this.account });
    }

    transferTo(to, deedId) {
        return this.contractInstance.methods
            .transferFrom(this.account, to, deedId)
            .send({ from: this.account, gas: this.gas });
    }

    create(deedId, deedURI) {
        console.log("contractInstance", this.contractInstance);
        return this.contractInstance.methods
            .registerDeed(deedId, deedURI)
            .send({ from: this.account, gas: this.gas });
    }
}
