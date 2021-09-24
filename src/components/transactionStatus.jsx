import Big from 'big.js';
import styles from "./../styles.module.css"
import { encode, decode } from 'js-base64';

async function transactionStatus(transaction, tokenId, memo, amount) {

    let validated = true;
    let divider = `1e+${transaction.tokenInfo.decimals}`
    let amountTx = (new Big(`${transaction.amount}`)).div(Big(divider));

    if (tokenId && transaction && transaction.tokenId != tokenId) validated = false;
    if (memo && transaction && transaction.data != encode(memo)) validated = false;
    if (amount && transaction && parseInt(amountTx) != amount) validated = false;
    return validated;
}

export { transactionStatus };