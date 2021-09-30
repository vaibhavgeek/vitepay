

## How to Use? (Example)
Install the VitePay package, 

`npm i vitepay.js`

or 

`yarn add vitepay.js`


```jsx
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
      amountDefault="250"
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
      httpURL="https://buidl.vite.net/gvite/http"
      checkPreviousTransactionsCount={500}
    />

    <TransactionCheck
      nodeURL="https://buidl.vite.net/gvite/http"
      recipientAddress="vite_10a86218cf37c795ebbdf8a7da643d92e22d860d2b747e049e"
      amount="250"
      tokenId="tti_5649544520544f4b454e6e40"
      memo="123abcd"
      checkPreviousTransactionsCount={500}
    ></TransactionCheck>
  </div>)
}

export default App





```

## How it Looks? (Video)
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/5tqTfJ1T6oE/0.jpg)](https://www.youtube.com/watch?v=5tqTfJ1T6oE)


## Parameters
| Parameter | Description | Default Value 
| -------- | ----------- | --------------
| recipientAddress | The payment will be made to this address |  vite_10a86218cf37c795ebbdf8a7da643d92e22d860d2b747e049e 
| defaultToken | This is token id for default token, you can find the token id listed on VITE from https://vitescan.io/. It can later be changed from the dropdown by person making the payment  | tti_5649544520544f4b454e6e40 
| defaultAmount | This is the default amount present in VITEPAY popup | 1 
| nodeURL | This is the default websockets node url, the default one being, it is used to connect VITE Node. | wss://buidl.vite.net/gvite/ws
| httpURL | This is default fallback of HTTP URL which is used in case websockets fail | https://buidl.vite.net/gvite/http
| paymentTimeout | This is timer by which payment will get timed out. It is present in seconds | 900 
| buttonStyle | Button style Object for "Pay with VITE" button | Example has the default button Class 
| defaultMemo | Default Memo Present in Payment Popup | 123abcd
| displayToken | Show Token Dropdown in form popup. In case of false, default values will be used.  | `true`
| displayAmount | Show Amount Input in form popup. In case of false, default values will be used.  | `true`
| displayMemo | Show Memo Input in form popup. In case of false, default values will be used. | `true`
| checkPreviousTransactionsCount | The number of transasctions it checks for your account to match the one recieving. Increase if high number of transactions on your website.  | 500 
## Callback Hooks 
| Function | Description 
| --------  | ----------- 
| onPaymentSuccess | Event to be called when payment has been successful
| onPaymentFailure | Event to be called when payment has failed
| onPaymentLogs | Log Payments (In case the person closed the window and yet the transaction did happen. )



## License

MIT © [vaibhavgeek](https://github.com/vaibhavgeek)
