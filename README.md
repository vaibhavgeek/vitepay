

## How to Use? (Example)
Install the VitePay package, 

`npm i vitepay.js`

or 

`yarn add vitepay.js`


```jsx
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


```

## How it Looks? (Video)
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/5tqTfJ1T6oE/0.jpg)](https://www.youtube.com/watch?v=DCgagBe2bKM)


## Parameters
| Parameter | Description | Default Value 
| -------- | ----------- | --------------
| recipientAddress | The payment will be made to this address |  vite_10a86218cf37c795ebbdf8a7da643d92e22d860d2b747e049e 
| defaultToken | This is token id for default token, you can find the token id listed on VITE from https://vitescan.io/. It can later be changed from the dropdown by person making the payment  | tti_5649544520544f4b454e6e40 
| defaultAmount | This is the default amount present in VITEPAY popup | 1 
| nodeURL | This is the default websockets node url, the default one being, it is used to connect VITE Node. | wss://buidl.vite.net/gvite/ws
| paymentTimeout | This is timer by which payment will get timed out. It is present in seconds | 900 
| buttonClass | Button class for "Pay with VITE" button | vitepay (Check Below for more information) 

## Callback Hooks 
| Function | Description 
| --------  | ----------- 
| onPaymentSuccess | Event to be called when payment has been successful
| onPaymentFailure | Event to be called when payment has failed
| onPaymentLogs | Log Payments (In case the person closed the window and yet the transaction did happen. )



## License

MIT © [vaibhavgeek](https://github.com/vaibhavgeek)
