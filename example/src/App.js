import React from 'react'

import { VitePay, TransactionCheck } from 'vitepay.js'
import 'vitepay.js/dist/index.css'


const onTransactionSuccess = (transaction) => {
  console.log("Pay successful", transaction);
};

const onTransactionFailure = (error) => {
  console.log("Payment Failed", error);
};

const paymentLogs = (logs) => {
  console.log("Payment Logs", logs);
};

const App = () => {
  return (<div>

    <VitePay
      amountDefault="1"
      tokenDefault="tti_5649544520544f4b454e6e40"
      defaultMemo="123abcd"
      displayToken={true}
      displayMemo={true}
      displayAmount={false}
      addressDefault="vite_10a86218cf37c795ebbdf8a7da643d92e22d860d2b747e049e"
      nodeURL="wss://buidl.vite.net/gvite/ws"
      paymentTimeout="900"
      buttonStyle={{
        "color": "#FFF",
        "backgroundColor": "#02298A",
        "fontSize": "18px",
        "textAlign": "center",
        "fontStyle": "normal",
        "borderRadius": "5px",
        "width": "200px",
        "borderWidth": "1px 1px 3px",
        "boxShadow": "0 -1px 0 rgba(255, 255, 255, 0.1) inset",
        "marginBottom": "10px",
        "height": "3em"
      }}
      onPaymentSuccess={onTransactionSuccess}
      onPaymentFailure={onTransactionFailure}
      onPaymentLogs={paymentLogs}
    />

    <TransactionCheck
      nodeURL="https://buidl.vite.net/gvite/http"
      recepientAddress="vite_10a86218cf37c795ebbdf8a7da643d92e22d860d2b747e049e"
      amount="1"
      memo="abcd123"
      tokenId="tti_5649544520544f4b454e6e40"
    ></TransactionCheck>
  </div>)
}

export default App
