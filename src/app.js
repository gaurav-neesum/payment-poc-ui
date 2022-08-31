import {PLATFORM} from "aurelia-framework";
import {inject} from "aurelia-framework";
import {PaymentApi} from "./payment-api";

@inject(PaymentApi)
export class App {
  configureRouter(config, router) {
    config.title = 'Payment';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      // {route: '', moduleId: PLATFORM.moduleName('home'), title: 'Welcome home', name: 'home-page'},
      {route: '', moduleId: PLATFORM.moduleName('./basket'), name: 'paymentForm'},
      {route: 'payment', moduleId: PLATFORM.moduleName('./payment-page'), name: 'PaymentPage'}
    ]);
    this.router = router;
  }
}
