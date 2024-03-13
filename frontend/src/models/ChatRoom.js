import Config from "../config";

export class ChatRoom {
    web3 = null;
    keyID = "";
    privateKey = "";
    publicKey = "";
    conn = null;
    room = "";
    identity = "";

    constructor() {
        this.privateKey = Config.WHISPER_SHARED_KEY;
    }

    async setWeb3(web3) {
        this.web3 = web3;
        this.keyID = await this.web3.shh.addPrivateKey(this.privateKey);
        this.publicKey = await this.web3.shh.getPublicKey(this.keyID);
    }

    getWeb3() {
        return this.web3;
    }

    async getWeb3ConnStatusAction() {
        return await this.web3.shh.net.isListening();
    }

    async subscribeToTopic(topic, fn) {
        this.conn = this.web3.shh
            .subscribe("messages", {
                privateKeyID: this.keyID,
                topics: [this.web3.utils.toHex(topic)],
            })
            .on("data", fn);
    }

    async sendJoinEvent(identity, room, data) {
        const messageRaw = {
            identity: identity,
            type: "join",
            data: data,
        };
        return await this.sendRawWhisperMessage(
            messageRaw,
            this.web3.utils.toHex(room)
        );
    }

    async sendMessageEvent(identity, room, data) {
        const messageRaw = {
            identity: identity,
            type: "msg",
            data: data,
        };
        return await this.sendRawWhisperMessage(
            messageRaw,
            this.web3.utils.toHex(room)
        );
    }

    async sendRawWhisperMessage(msg, topic) {
        return await this.web3.shh.post({
            pubKey: this.publicKey, // Encrypts using the public key
            ttl: 10,
            topic: this.web3.utils.toHex(topic),
            payload: this.web3.utils.toHex(JSON.stringify(msg)),
            powTime: 60,
            powTarget: 0.2,
        });
    }
}
