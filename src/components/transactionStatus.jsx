import Big from 'big.js';
import styles from "./../styles.module.css"
import React from "react";
import { encode, decode } from 'js-base64';

const transactionStatus = (transaction, senderAddress, tokenId, memo, amount) => {
    const validated = true;
    let divider = `10e-${transaction.tokenInfo.decimals}`
    let amountTx = (new Big(`${transaction.amount}`)).div(Big(divider));

    if(senderAddress && transaction.accountAddress !== senderAddress) validated = false;
    if(tokenId && transaction.tokenId !== tokenId) validated = false;
    if(memo && decode(transaction.data) !== memo) validated = false;
    if(amount && amountTx !== amount) validated = false;
    
    return validated;
}

export { transactionStatus };