import Big from 'big.js';
import styles from "./../styles.module.css"
import { encode, decode } from 'js-base64';
import { getTransactionHistory } from './client';


// async function responseRequestValidation(request, response, tokenId, memo, amount){
//     let validated = false;
//     let divider = `1e+${request.tokenInfo.decimals}`
//     let amountTxRequest = (new Big(`${request.amount}`)).div(Big(divider));
//     let amountTxResponse = (new Big(`${response.amount}`)).div(Big(divider));

//     let tokenIdRequest = request.tokenId;
//     let tokendIdResponse = response.tokenId;

//     if(amountTxRequest === amountTxResponse && tokenIdRequest === tokendIdResponse && request.data == encode(memo)) validated = true;
//     return validated;

// }

async function transactionStatus(transaction, tokenId, memo, amount, provider) {

    
        let validated = false;
        let divider = `1e+${transaction.tokenInfo.decimals}`
        let amountTx = (new Big(`${transaction.amount}`)).div(Big(divider));
        
        const transactions = await getTransactionHistory(transaction.fromAddress, provider);
        let request = transactions.filter((tx) => tx.data == encode(memo) && tx.amount == transaction.amount && tx.tokenId == transaction.tokenId)
       

        if(request.length > 0 && parseInt(amount) == parseInt(amountTx) && tokenId == transaction.tokenId) validated = true;
        return validated;
    
}

export { transactionStatus };