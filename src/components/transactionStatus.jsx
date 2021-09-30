import Big from 'big.js';
import styles from "./../styles.module.css"
import { encode, decode } from 'js-base64';
import { getHashInfo } from './client';

async function transactionStatus(transaction, tokenId, memo, amount, provider) {
        let validated = false;
        let divider = `1e+${transaction.tokenInfo.decimals}`
        let amountTx = (new Big(`${transaction.amount}`)).div(Big(divider));
        if (transaction.fromBlockHash === "0000000000000000000000000000000000000000000000000000000000000000") {
                return false;
        }
        const request = await getHashInfo(transaction.fromBlockHash, provider);
        if(request !== null && request.data == encode(memo) && parseInt(amount) == parseInt(amountTx) && tokenId == transaction.tokenId) validated = true;

        return validated;
    
}

export { transactionStatus };