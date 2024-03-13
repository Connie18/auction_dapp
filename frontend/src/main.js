import Vue from "vue";
import App from "./App";
import Config from "./config";
import router from "./router";
import Vuetify from "vuetify";
import VueResource from "vue-resource";
import { ChatRoom } from "./models/ChatRoom";
import { DeedRepository } from "./models/DeedRepository";
import { AuctionRepository } from "./models/AuctionRepository";

var Web3 = require("web3");

Vue.use(VueResource);
Vue.use(Vuetify);
Vue.config.productionTip = false;

// state management
var store = {
    debug: true,
    state: {
        // metamask state variable
        metamask: {
            web3DefaultAccount: "",
            metamaskInstalled: false,
            networkId: "",
        },

        // local web3 instance(not metamask)
        web3: null,
    },
    networkReady() {
        return (
            this.getNetworkId() != "" &&
            this.getMetamaskInstalled() &&
            this.getWeb3DefaultAccount() != ""
        );
    },
    setNetworkId(networkId) {
        this.state.metamask.networkId = networkId;
    },
    getNetworkId() {
        return this.state.metamask.networkId;
    },

    setWeb3DefaultAccount(account) {
        this.state.metamask.web3DefaultAccount = account;
    },
    getWeb3DefaultAccount() {
        return this.state.metamask.web3DefaultAccount;
    },

    setMetamaskInstalled() {
        this.state.metamask.metamaskInstalled = true;
    },
    getMetamaskInstalled() {
        return this.state.metamask.metamaskInstalled;
    },

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
};

Vue.mixin({
    created: function () {
        // Inject the models to components
        this.$chatroomInstance = new ChatRoom();
        this.$deedRepoInstance = new DeedRepository();
        this.$auctionRepoInstance = new AuctionRepository();

        this.$chatroomInstance.setWeb3(new Web3(Config.SHH_ENDPOINT));

        // MetaMaskとの連携
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((accounts) => {
                    if (accounts.length > 0) {
                        store.setWeb3DefaultAccount(accounts[0]);
                    }
                })
                .catch((error) => {
                    console.error("User denied account access");
                });
        } else if (window.web3) {
            // 既存のWeb3プロバイダーのサポート
            window.web3 = new Web3(web3.currentProvider);
        } else {
            console.log(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }

        // メタマスクのインストール状況
        store.setMetamaskInstalled();
        window.web3.eth.net.getId().then((netId) => {
            store.setNetworkId(netId);
        });

        // モデルへのweb3設定を更新
        this.$auctionRepoInstance.setWeb3(window.web3);
        this.$deedRepoInstance.setWeb3(window.web3);

        // アカウント情報の定期的な更新
        setInterval(() => {
            if (window.web3) {
                window.web3.eth.getAccounts().then((accounts) => {
                    if (accounts.length > 0)
                        store.setWeb3DefaultAccount(accounts[0]);
                });
            }
        }, 2000);

        // inject config to components
        this.$config = Config;
    },
});

new Vue({
    el: "#app",
    data: {
        globalState: store,
    },
    router,
    template: "<App/>",
    components: { App },
    mounted() {},
});
