import React from "react";

import styled from '@emotion/styled';
import Select from 'react-dropdown-select';
import styles from "./../styles.module.css"

const StyledSelect = styled(Select)`
  .react-dropdown-select-item.react-dropdown-select-item-selected,
  .react-dropdown-select-item.react-dropdown-select-item-active {
    background-color: white;
    color: #02298A;
  }
 
`;
const TransactionHistory = ({ tokenId, setTokenId, memo, setMemo, amount, setAmount, options }) => {
    return (
        <div className={styles.form}>
            <label>
                Token
                {options.length > 0 ? (
                    <StyledSelect
                        className={styles.dropdown}
                        closeOnSelect={true}
                        clearOnSelect={true}
                        options={options}
                        values={[options.find(opt => opt.tokenId === tokenId)]}
                        onChange={(e) => { setTokenId(e[0].tokenId); }}
                    />
                ): <p>Loading ....</p>}

            </label>

            <label>
                Memo:
                <input type="text" name="Memo" value={atob(memo)} onChange={(e) => setMemo(btoa(e.target.value))} />
            </label>

            <label>
                Amount:
                <input type="text" name="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </label>

        </div>)
};
export default TransactionHistory;