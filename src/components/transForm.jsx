import React from "react";
import { encode, decode } from 'js-base64';

import styled from '@emotion/styled';
import Select from 'react-dropdown-select';
import styles from "./../styles.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

const StyledSelect = styled(Select)`
  .react-dropdown-select-item.react-dropdown-select-item-selected,
  .react-dropdown-select-item.react-dropdown-select-item-active {
    background-color: white;
    color: #02298A;
  }
 
`;
const TransactionForm = ({ tokenId, setTokenId, memo, inputMemo, amount, setAmount, options, displayToken, displayMemo, displayAmount, checkStatus }) => {
    return (
        <div className={styles.form}>
            <label style={{ textAlign: "right" }}>
                Refresh Status: <button onClick={(e) => checkStatus(e,tokenId, memo, amount)}>
                    <FontAwesomeIcon size="x" icon={faSync} /></button>

            </label>
            {displayToken && (<label>
                Token
                {options.length > 0 ? (
                    <StyledSelect
                        className={styles.dropdown}
                        closeOnSelect={true}
                        clearOnSelect={true}
                        options={options}
                        values={[options.find(opt => opt.tokenId === tokenId)]}
                        onChange={(e) => { setTokenId(e[0]?.tokenId); }}
                    />
                ) : <p>Loading ....</p>}

            </label>)}

            {displayMemo && (<label>
                Memo:
                <input type="text" name="Memo" ref={inputMemo} />
            </label>)}


            {displayAmount && (
                <label>
                    Amount:
                    <input type="text" name="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </label>
            )}


        </div>)
};
export default TransactionForm;