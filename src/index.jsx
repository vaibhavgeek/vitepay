

import { QRCode } from 'react-qrcode-logo';
import React from "react";
import { useState, useEffect } from "react";
import ReactModal from 'react-modal';

import Big from 'big.js';

import { newOnroadBlocksByAddr, getTokenList, getHashInfo, getTransactionHistory } from './components/client';
import ProgressBar from "./components/progressBar";
import Transaction from "./components/transHistory";
import TransactionForm from "./components/transForm";
import { transactionStatus } from "./components/transactionStatus";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { ViteAPI } from '@vite/vitejs';
import { WS_RPC } from '@vite/vitejs-ws';


import styles from "./styles.module.css"

export const TransactionCheck = ({nodeURL = "wss://buidl.vite.net/gvite/ws", 
senderAddress, 
recipientAddress, 
amount, 
memo, 
tokenId }) => {
  const [status, setStatus] = useState(false);

  useEffect(async () => {
    let WS_service = new WS_RPC(nodeURL);
    let provider = new ViteAPI(WS_service);
    const transactions = await getTransactionHistory(recipientAddress, provider);
    for (var i = 0; i < transactions.length; i++) {
      if (transactionStatus(transactions[i], senderAddress, amount, memo, tokenId)) {
        setStatus(true);
        break;
      }
    }
  }, []);

  return status


};

export const VitePay = ({
  amountDefault = "0", tokenDefault = "tti_5649544520544f4b454e6e40",
  addressDefault = "vite_10a86218cf37c795ebbdf8a7da643d92e22d860d2b747e049e",
  nodeURL = "wss://buidl.vite.net/gvite/ws",
  defaultMemo = "MTIzYWJjZA",
  paymentTimeout = "900",
  displayToken = true,
  displayMemo = true,
  displayAmount = true,
  buttonStyle,
  onPaymentSuccess,
  onPaymentFailure,
  onPaymentLogs }) => {

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
  const [nodeLink, setNoteLink] = useState(nodeURL);
  // Get account hash on payment
  useEffect(async () => {
    let WS_service = new WS_RPC(nodeLink);
    let provider = new ViteAPI(WS_service);

    const event = await newOnroadBlocksByAddr(address, provider);
    event.on(async (result) => {

      const hashAddress = result[0].hash;
      const txInfo = await getHashInfo(hashAddress, provider);
      setTransaction(txInfo);

      if (validatePayment(txInfo) && txInfo.receiveBlockHeight === null) {
        setState(1);
        onPaymentLogs(txInfo);
      }
      else if (validatePayment(txInfo) && txInfo.receiveBlockHeight !== null) {
        setState(2);
        onPaymentSuccess(txInfo);
      }
      else if (!validatePayment(txInfo)) {
        setState(3);
        onPaymentFailure(txInfo);
      }

    });

    // set dropdown from the getToken
    const token = await getTokenList(provider);
    token.tokenInfoList.forEach((value, index) => {
      value.label = value.tokenName;
      value.key = index;
    });
    setOptions(token.tokenInfoList);



  }, [nodeLink]);

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
    let divider = `10e-${hashTx.tokenInfo.decimals}`
    let amountTx = (new Big(`${hashTx.amount}`)).div(Big(divider));

    if (hashTx.data !== memo) valid = false;
    if (parseInt(amountTx) !== amount) valid = false;
    if (hashTx.tokenId !== tokenId) valid = false;
    return valid;
  }

  async function checkStatus(tokenId, memo, amount) {
    let WS_service = new WS_RPC(nodeURL);
    let provider = new ViteAPI(WS_service);
    const transactions = await getTransactionHistory(recipientAddress, provider);
    const status = false;
    for (var i = 0; i < transactions.length; i++) {
      if (transactionStatus(transactions[i], address, amount, memo, tokenId)) {
        status = true;
        setTransaction(transactions[i]);
        break;
      }
    }
    if (status) {
      setState(2)
    }
    return status;
  }

  return (
    <div className={styles.App}>
      <button style={buttonStyle} className={styles.embed} onClick={() => setOpen(true)}> Pay With VITE </button>
      <ReactModal className={styles.modal} isOpen={open}>
        <FontAwesomeIcon onClick={() => setOpen(false)} className={styles.closeButton} size="2x" icon={faTimesCircle} />


        <form className={styles.vitepay}>

          {state === 0 ? <p>The transaction will expire in {Math.floor(timer / 60)}{":"}{timer - Math.floor(timer / 60) * 60}</p> : <p>Transaction is Complete</p>}
          <QRCode size="200" className={styles.qrCode} logoImage="/vitelabs-removebg.jpg" value={qr} />
          <ProgressBar state={state} />
          {state === 0 && (
            <TransactionForm checkStatus={checkStatus} displayAmount={displayAmount} displayMemo={displayMemo} displayToken={displayToken} address={address} setAddress={setAddress} memo={memo} setMemo={setMemo} tokenId={tokenId} setTokenId={setTokenId} amount={amount} setAmount={setAmount} options={options} />
          )}
          {(state === 2 || state === 3) && transaction && (
            <Transaction transaction={transaction} />
          )}
        </form>

      </ReactModal>

    </div>

  );
}
