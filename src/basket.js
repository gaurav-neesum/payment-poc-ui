import {PaymentApi} from "./payment-api";
import {Router} from "aurelia-router";
import {inject} from "aurelia-framework";

@inject( Router, PaymentApi)
export class Basket {
  constructor(router, api) {
    this.router = router;
    this.api = api;
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
    // this.params = params;
    this.routeConfig.navModel.setTitle('Payment Form Pag');
  }

  save() {
    this.amount = this.paymentAmount;

    console.log("Amount was: " + this.amount);
    this.api.startPayment(this.amount)
      .then(jwtToken => {
        sessionStorage.cybersourceCaptureContext = jwtToken.jwtToken;
        this.router.navigateToRoute('PaymentPage');
      })
      .catch(error => {
        console.log("Error happened: " + error);
      })
  }

}
