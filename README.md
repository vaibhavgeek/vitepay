

## How to Use? (Example)

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

## How to Use (Video)
[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/DCgagBe2bKM/0.jpg)](https://www.youtube.com/watch?v=DCgagBe2bKM)


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

## VITEPAY Development Logs
Generate payment information according to orders received by the merchants. The payment information should include the following:
- QR Code: the QR code should include the Vite address, payment currency and the payment amount.
- Memo: It is used to distinguish different orders. Each order should have its own distinct memo.
- Scan QR code with the Vite App. After scanning, it redirects the user to the payment page. The App retrieves the Vite address, payment currency and payment amount. On the same page, the user is able to fill in the memo manually and initiate the payment process.

Once the payment process is initiated within the App, VitePay will look up the payment information. If it detects the matching order information (as distinguished by the memo), the screen display shows “Processing”, resulting in one of the following:

Payment Successful. This means payment currency, amount and memo match up with the order and the network has achieved 30 confirmations.
Payment Failed. This means one or more of the information regarding payment currency, amount or memo does not match up with the order. This will trigger refund back to the original address.

Other scenarios:
- Time out: if the payment is not completed within 15 minutes, the order will be canceled automatically Payment after order cancelation: if the order is canceled manually or due to time-out, no payments will be facilitated.
- The ability to review payment information and track order after payment success. The following is a mockup for the payment page.

Feedback Provided, 
1. Let’s make this as a library that could be published on npm. For now I see all code are generated on a local machine and can only be called from the same machine. 
2. When a developer wants to integrate Vitepay into his website, he could import the library in his website and set up the recipient address, seed phrase, Vite full node url (if the user would like to use his own node), other settings like payment check frequency, payment timeout, switches of showing the default payment success/fail pages. 
3. The VitePay library should provide a default “Pay with VitePay” button, and default payment success/fail pages. The website developer can embed the button in the website page, when a customer checks out, he clicks on the button and see a payment QR code with all necessary information including amount, token id, and orderId (as memo), etc. The QR code should display in the same place on the website replacing the button (not as a separate popup window), along with the QR code there should be a “Cancel” button, when the user can hit on to cancel the payment.
4. If a payment is successful and the website doesn’t designate a 3rd party payment success page, we should display the default page. Similarly, if a payment failed or is timeout, display the default payment failed page. 
5. It’s very important to pass in a “Callback Hook” when the “Pay with VitePay” button is populated. Actually they are two hooks, one for success payment and the other is for payment failure. So that the website can be notified when the payment is complete or failed. 
6. In order to improve the payment experience. The library should provide an interface so that if the user unexpectedly closes the browser window during payment process (in this case the website may never be informed if a in-process order is paid), the website can actively call this interface and pass in an order id, the VitePay library will look up for any transaction received (could have a timeframe if there are too many transactions) by the recipient’s address with this order id in the memo, and return payment is complete or doesn’t exist.
