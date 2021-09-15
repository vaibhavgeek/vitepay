import Big from 'big.js';
import styles from "./../styles.module.css"
import React from "react";

const TransactionHistory = ({ transaction }) => {
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
                Memo: {atob(transaction.data)}

            </label>

            <label>
                Amount: {(new Big(`${transaction.amount}`)).div(new Big(10).pow(parseInt(transaction.tokenInfo.decimals))).toNumber()}
            </label>

        </div>
    )}
export default TransactionHistory;