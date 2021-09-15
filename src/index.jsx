

import { QRCode } from 'react-qrcode-logo';
import React from "react";
import { useState, useEffect } from "react";
import ReactModal from 'react-modal';

import Big from 'big.js';

import { newOnroadBlocksByAddr, getTokenList, getHashInfo } from './components/client';
import ProgressBar from "./components/progressBar";
import Transaction from "./components/transHistory";
import TransactionForm from "./components/transForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import styles from "./styles.module.css"

export const VitePay = ({amountDefault,tokenDefault, addressDefault,nodeURL,defaultMemo,paymentTimeout, buttonStyle, failMessage, successMessage , onPaymentSuccess, onPaymentFailure, onPaymentLogs })  => {

  const [address, setAddress] = useState(addressDefault);
  const [tokenId, setTokenId] = useState(tokenDefault);
  const [memo, setMemo] = useState(defaultMemo);
  const [amount, setAmount] = useState(amountDefault);
  const [options, setOptions] = useState([]);
  const [qr, setQR] = useState(`vite:${address}?tti=${tokenId}&amount=${amount}&data=${memo}`);
  const [state, setState] = useState(0);
  const [transaction, setTransaction] = useState(null);
  const [timer, setTimer] = useState(parseInt(paymentTimeout));
  const [open, setOpen] = useState(false);
  // Get account hash on payment
  useEffect(async () => {
    
    const event = await newOnroadBlocksByAddr(address,nodeURL);
    event.on(async (result) => {
      setState(1);
      const hashAddress = result[0].hash;
      const txInfo = await getHashInfo(hashAddress,nodeURL);
      setTransaction(txInfo);
      onPaymentLogs(txInfo);
      if(validatePayment(txInfo)){
        setState(2); 
        onPaymentSuccess(txInfo);
      } else { 
        setState(3);
        onPaymentFailure(txInfo);
      }
    });

    // set dropdown from the getToken
    const token = await getTokenList(nodeURL);
    token.tokenInfoList.forEach((value, index) => {
      value.label = value.tokenName;
      value.key = index;
    });
    setOptions(token.tokenInfoList);

    

  },[]);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      window.close();
    }
  });

 

  // change QR when variables are changed
  useEffect(async () => {
    memo.replaceAll("=", "");
    setQR(`vite:${address}?tti=${tokenId}&amount=${amount}&data=${memo.replaceAll("=", "")}`);
  }, [address, tokenId, memo, amount]);


  // make sure if the transaction is valid or not. 
  async function validatePayment(hashTx) {
    var valid = true;
    let multiplier = `10e-${hashTx.tokenInfo.decimals}`
    let amountTx = (new Big(`${hashTx.amount}`)).div(Big(multiplier));
    if (hashTx.data !== memo) valid = false;
    if (parseInt(amountTx) !== amount) valid = false;
    return valid;
  }

 
  return (
    <div className={styles.App}>    
      <button style={buttonStyle} className={styles.embed} onClick={() => setOpen(true)}> Pay With VITE </button>
      <ReactModal className={styles.modal} isOpen={open}>
      <FontAwesomeIcon onClick={() => setOpen(false)} className={styles.closeButton} size="2x" icon={faTimesCircle} />

    
        <form className={styles.vitepay}>

         {state === 0  ? <p>The transaction will expire in {Math.floor(timer / 60)}{":"}{timer - Math.floor(timer / 60) * 60}</p> : <p>Transaction is Complete</p>}
          <QRCode size="200" className={styles.qrCode} logoImage="/vitelabs-removebg.jpg" value={qr} />
          <ProgressBar state={state} />
          {state === 0 && (
            <TransactionForm address={address} setAddress={setAddress} memo={memo} setMemo={setMemo} tokenId={tokenId} setTokenId={setTokenId} amount={amount} setAmount={setAmount} options={options} />
          )}
          {(state === 2 || state === 3) && transaction && (
            <Transaction transaction={transaction} />
          )}
        </form>
     
      </ReactModal>
      
    </div>

  );
}
