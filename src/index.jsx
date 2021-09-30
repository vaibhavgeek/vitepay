
// imports from third party library
import { QRCode } from 'react-qrcode-logo';
import React from "react";
import { useState, useEffect, useRef } from "react";
import ReactModal from 'react-modal';
import { encode, decode } from 'js-base64';
import Big from 'big.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { ViteAPI, accountBlock } from '@vite/vitejs';
import { WS_RPC } from '@vite/vitejs-ws';
import HTTP_RPC from '@vite/vitejs-http';

//imports from components
import { newOnroadBlocksByAddr, getTokenList, getHashInfo, getTransactionHistory } from './components/client';
import ProgressBar from "./components/progressBar";
import Transaction from "./components/transHistory";
import TransactionForm from "./components/transForm";
import { transactionStatus } from "./components/transactionStatus";
import styles from "./styles.module.css"

export const TransactionCheck = ({ nodeURL = "https://buidl.vite.net/gvite/http",
  recipientAddress,
  amount,
  memo,
  tokenId,
  checkPreviousTransactionsCount = 100 }) => {

  const [status, setStatus] = useState(false);

  useEffect(async () => {
    let httpRPC = new HTTP_RPC(nodeURL);
    let provider = new ViteAPI(httpRPC, () => {
      return
    });

    let transactions = await getTransactionHistory(recipientAddress, provider, checkPreviousTransactionsCount);
    transactions = transactions.filter(tx => tx.fromAddress !== tx.toAddress && tx.blockType == 4);
    if (transactions !== null && transactions.length > 0) {
      for (var i = 0; i < transactions.length; i++) {
        if (await transactionStatus(transactions[i], tokenId, memo, amount, provider)) {
          setStatus(true);
          break;
        }
      }
    }

  }, []);

  return status === true ? ("Transaction Found") : ("Transaction Not Found");

};

export const VitePay = ({
  amountDefault = "0", tokenDefault = "tti_5649544520544f4b454e6e40",
  addressDefault = "vite_10a86218cf37c795ebbdf8a7da643d92e22d860d2b747e049e",
  nodeURL = "wss://buidl.vite.net/gvite/ws",
  httpURL = "https://buidl.vite.net/gvite/http",
  defaultMemo = "123abcd",
  paymentTimeout = "900",
  displayToken = true,
  displayMemo = true,
  displayAmount = true,
  checkPreviousTransactionsCount=500,
  buttonStyle,
  onPaymentSuccess,
  onPaymentFailure,
  onPaymentLogs }) => {


  const inputMemo = useRef(defaultMemo);
  const inputAmount = useRef(amountDefault);
  const inputToken = useRef(tokenDefault);

  const [address, setAddress] = useState(addressDefault);
  const [tokenId, setTokenId] = useState(tokenDefault);
  const [memo, setMemo] = useState(defaultMemo);
  const [amount, setAmount] = useState(amountDefault);

  const [options, setOptions] = useState([]);
  const [qr, setQR] = useState(`vite:${address}?tti=${tokenId}&amount=${amount}&data=${encode(memo).replaceAll("=", "")}`);

  const [state, setState] = useState(0);
  const [transaction, setTransaction] = useState(null);
  const [timer, setTimer] = useState(parseInt(paymentTimeout));
  const [open, setOpen] = useState(false);



  useEffect(async () => {

    let WS_service = new WS_RPC(nodeURL);
    let provider = new ViteAPI(WS_service);
    // set dropdown from the getToken
    const token = await getTokenList(provider);

    token.tokenInfoList.forEach((value, index) => {
      value.label = value.tokenName;
      value.key = index;
    });
    setOptions(token.tokenInfoList);

    const event = await newOnroadBlocksByAddr(address, provider);
    event.on(async (result) => {
      
      const hashAddress = result[0].hash;
      const txInfo = await getHashInfo(hashAddress, provider);
      
      let memoScoped = displayMemo ? inputMemo?.current?.value : inputMemo?.current;
      let amountScoped = displayAmount ? inputAmount?.current?.value : inputAmount?.current;
      let tokenScoped = displayToken ? inputToken?.current?.props?.values[0]?.tokenId : inputToken?.current;
      
      console.log('InuptMemo: ' + inputMemo?.current)
      console.log('InuptMemo Value: ' + inputMemo?.current?.value)
      console.log('InuptAmount: ' + inputAmount?.current)
      console.log('InuptAmount Value: ' + inputAmount?.current?.value)

      if (inputMemo.current && inputAmount.current && inputToken.current) {
        if (await validatePayment(txInfo, memoScoped, amountScoped, tokenScoped)) {
          setState(2);
          onPaymentSuccess(txInfo);
        }
        else if (timer < 3) {
          setState(-1);
          onPaymentFailure(txInfo);
        }
        else {
          onPaymentLogs(txInfo);
          setState(1);
        }
      }
      setTransaction(txInfo);
     
    });

  }, []);

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      setState(-1);
    }
  });


  // change QR when variables are changed
  useEffect(async () => {
    setQR(`vite:${address}?tti=${tokenId}&amount=${amount}&data=${encode(memo).replaceAll("=", "")}`);
  }, [address, tokenId, memo, amount]);


  // make sure if the transaction is valid or not. 
  async function validatePayment(hashTx, memo, amount, tokenId) {
    let valid = false;
    let divider = `1e+${hashTx.tokenInfo.decimals}`
    let amountTx = (new Big(`${hashTx.amount}`)).div(Big(divider));
    if(hashTx.data === null) return;  
    if (hashTx.data == encode(memo) && parseInt(amountTx) == parseInt(amount) && hashTx.tokenId == tokenId) valid = true;
    return valid;
  }

  async function checkStatus(e, tokenId, memo, amount) {
    e.preventDefault();

    let httpRPC = new HTTP_RPC(httpURL);
    let provider = new ViteAPI(httpRPC, () => {
      return
    });

    let transactions = await getTransactionHistory(address, provider, checkPreviousTransactionsCount);
    transactions = transactions.filter(tx => tx.fromAddress !== tx.toAddress && tx.blockType == 4);
    let statusTransaction = false;
    if (transactions !== null && transactions.length > 0) {
      for (var i = 0; i < transactions.length; i++) {
        if (await transactionStatus(transactions[i], tokenId, memo, amount, provider)) {
          statusTransaction = true;
          setTransaction(transactions[i]);
          setState(2);
          break;
        }
      }
    }
    return statusTransaction;
  }

  return (
    <div className={styles.App}>
      <button style={buttonStyle} className={styles.embed} onClick={() => setOpen(true)}> Pay With VITE </button>
      <ReactModal className={styles.modal} isOpen={open}>
        <FontAwesomeIcon onClick={() => setOpen(false)} className={styles.closeButton} size="2x" icon={faTimesCircle} />


        <form className={styles.vitepay}>

          {state === 0 && <p>The transaction will expire in {Math.floor(timer / 60)}{":"}{timer - Math.floor(timer / 60) * 60}</p>}
          {(state === 1  || state === 2) && <p>Transaction is Complete</p>}
          {state === -1 && <p>Transaction has failed</p>}
          <QRCode size="200" className={styles.qrCode} logoImage="/vitelabs-removebg.jpg" value={qr} />
          <ProgressBar state={state} />
          {state === 0 && (
            <TransactionForm inputMemo={inputMemo} inputAmount={inputAmount} inputToken={inputToken} checkStatus={checkStatus} displayAmount={displayAmount} displayMemo={displayMemo} displayToken={displayToken} memo={memo} setMemo={setMemo} address={address} setAddress={setAddress} tokenId={tokenId} setTokenId={setTokenId} amount={amount} setAmount={setAmount} options={options} />
          )}
          {(state === 2) && transaction && (
            <Transaction memo={memo} transaction={transaction} />
          )}
        </form>

      </ReactModal>

    </div>

  );
}
