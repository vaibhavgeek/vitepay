import Big from 'big.js';
import styles from "./../styles.module.css"
import React from "react";
import { encode, decode } from 'js-base64';

const TransactionHistory = ({ transaction, senderAddress, tokenId, memo, amount}) => {
    const validated = true;
    let divider = `10e-${transaction.tokenInfo.decimals}`
    let amountTx = (new Big(`${transaction.amount}`)).div(Big(divider));

    if(senderAddress && transaction.accountAddress !== senderAddress) validated = false;
    if(tokenId && transaction.tokenId !== tokenId) validated = false;
    if(memo && transaction.data !== memo) validated = false;
    if(amount && amountTx !== amount) validated = false;
    
    return validated ? (
        <div className={styles.form}>
            <label>
                <span> 
                Sender Address:
                    <br /> <span className={styles.address}>{transaction.accountAddress}</span></span>
            </label>

            <label>
                Token: {transaction.tokenInfo.tokenName}

            </label>

            <label>
                Memo: {(transaction.data)}

            </label>

            <label>
                Amount: {(new Big(`${transaction.amount}`)).div(new Big(10).pow(parseInt(transaction.tokenInfo.decimals))).toNumber()}
            </label>

        </div>
    ): (<> Transaction Not Found </>)}

export default TransactionHistory;