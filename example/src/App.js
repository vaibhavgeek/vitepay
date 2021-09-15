import React from 'react'

import { VitePay } from 'vitepay.js'
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
  return <VitePay
    amountDefault="1"
    tokenDefault="tti_5649544520544f4b454e6e40"
    addressDefault="vite_10a86218cf37c795ebbdf8a7da643d92e22d860d2b747e049e"
    nodeURL="wss://buidl.vite.net/gvite/ws"
    defaultMemo="MTIzYWJjZA"
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
}

export default App
