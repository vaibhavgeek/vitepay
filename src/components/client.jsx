async function newOnroadBlocksByAddr(address, provider) {
    const result = await provider.subscribe("newOnroadBlocksByAddr", address);
    return result;
}

async function getHashInfo(hash,provider) {
    const result = await provider.request("ledger_getBlockByHash", hash);
    return result;
}

async function getTokenList(provider) {
    const result = await provider.request('contract_getTokenInfoList', 0, 1000);
    return result;
}

async function getTransactionHistory(address, provider){
    const result = await provider.request("ledger_getBlocksByAccAddr", address, 0 , 100);
    return result;
}
export { newOnroadBlocksByAddr, getTokenList, getHashInfo, getTransactionHistory };