import Big from 'big.js';
import styles from "./../styles.module.css"
import React from "react";
import { encode, decode } from 'js-base64';

const TransactionHistory = ({ transaction , memo }) => {
    return (
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
                Memo: {memo}

            </label>

            <label>
                Amount: {(new Big(`${transaction.amount}`)).div(new Big(10).pow(parseInt(transaction.tokenInfo.decimals))).toNumber()}
            </label>

        </div>
    )}
export default TransactionHistory;