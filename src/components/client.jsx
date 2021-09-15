import { ViteAPI } from '@vite/vitejs';
import { WS_RPC } from '@vite/vitejs-ws';


async function newOnroadBlocksByAddr(address, nodeURL) {
    let WS_service = new WS_RPC(nodeURL);
    let provider = new ViteAPI(WS_service);

    const result = await provider.subscribe("newOnroadBlocksByAddr", address);
    return result;
}

async function getHashInfo(hash, nodeURL) {
    let WS_service = new WS_RPC(nodeURL);
    let provider = new ViteAPI(WS_service);

    const result = await provider.request("ledger_getBlockByHash", hash);
    return result;
}

async function getTokenList(nodeURL) {
    let WS_service = new WS_RPC(nodeURL);
    let provider = new ViteAPI(WS_service);

    const result = await provider.request('contract_getTokenInfoList', 0, 1000);
    return result;
}

export { newOnroadBlocksByAddr, getTokenList, getHashInfo };