import {inject} from "aurelia-framework";
import {HttpClient} from "aurelia-fetch-client";

let paymentHttpClient = new HttpClient();

@inject(HttpClient)
export class PaymentApi {

  startPayment(amount) {
    return paymentHttpClient.fetch("http://localhost:5005/cb/start-payment?amount=" + amount,
      {
        method: 'POST'
      })
      .then(response => response.json())
      .then(jwt => {
        console.log("jwt response: " + jwt);

        return {

          jwtToken: jwt,

          // APIToken: apiToken,


        }
      })
      .catch(error => {
        console.log('There was an error');
        throw error;
      })

  }

}
