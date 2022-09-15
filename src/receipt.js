import {inject} from "aurelia-framework";
import {PaymentApi} from "./payment-api";

@inject(PaymentApi)
export class Receipt {
  constructor(paymentApi) {
    this.paymentApi = paymentApi;
  }

  activate(params) {
    if (params.transactionUUID) {
      this.paymentApi.checkPayment(params.transactionUUID)
        .then(response => {
          console.log('Payment Response', response);
          if (response) {
            parent.postMessage('PAID', window.location.origin);
          } else {
            console.log('Hatterika');
          }
        })
    }
    console.log("Receipt page called");

  }

  attached(params) {
    if (params.transactionUUID) {
      this.paymentApi.checkPayment(params.transactionUUID)
        .then(response => {
          console.log('Payment Response', response);
          if (response) {
            parent.postMessage('PAID', window.location.origin);
          } else {
            console.log('Hatterika');
          }
        })
    }
    console.log("Receipt page called");
  }

  canActivate(params) {
    if (params.transactionUUID) {
      this.paymentApi.checkPayment(params.transactionUUID)
        .then(response => {
          console.log('Payment Response', response);
          if (response) {
            parent.postMessage('PAID', window.location.origin);
          } else {
            console.log('Hatterika');
          }
        })
    }
    console.log("Receipt page called");

  }
}
