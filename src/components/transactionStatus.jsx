import Big from 'big.js';
import styles from "./../styles.module.css"
import { encode, decode } from 'js-base64';
import { getTransactionHistory } from './client';

async function transactionStatus(transaction, tokenId, memo, amount, provider) {

    
        let validated = false;
        let divider = `1e+${transaction.tokenInfo.decimals}`
        let amountTx = (new Big(`${transaction.amount}`)).div(Big(divider));
        console.log(encode(memo));
        
        const transactions = await getTransactionHistory(transaction.fromAddress, provider);
        let request = transactions.filter((tx) => tx.data == encode(memo) && tx.amount == transaction.amount && tx.tokenId == transaction.tokenId)
        if(request.length > 0 && parseInt(amount) == parseInt(amountTx) && tokenId == transaction.tokenId) validated = true;
        return validated;
    
}

export { transactionStatus };