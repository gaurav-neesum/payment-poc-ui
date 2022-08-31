import {inject} from "aurelia-framework";
import {PaymentApi} from "./payment-api";

@inject(PaymentApi)
export class Receipt {
  constructor(paymentApi) {
    this.paymentApi = paymentApi;
  }

  activate(params, routeConfig) {
    console.log("Receipt page called");
    this.routeConfig = routeConfig;
    this.routeConfig.navModel.setTitle('Receipt')

  }

  canActivate(params){
    console.log("Rceipt page")
  }
}
