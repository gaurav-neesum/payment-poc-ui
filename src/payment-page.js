import {PaymentApi} from "./payment-api";
import {inject} from "aurelia-framework";


@inject(PaymentApi)
export class PaymentPage {
  constructor(paymentApi) {
    this.paymentApi = paymentApi;
    this.paymentResponse;
    this.judo;
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;
    this.routeConfig.navModel.setTitle('Judopay payment')
  }

  receipt(){
    const elem = document.getElementsByName("transientToken");
    console.log(elem);

  }

  attached() {
    let scriptElement = document.createElement('script');
    scriptElement.src = "https://flex.cybersource.com/cybersource/assets/microform/0.11/flex-microform.min.js";
    let captureContext = sessionStorage.cybersourceCaptureContext;
    document.head.appendChild(scriptElement);
    let myStyles = {
      'input': {
        'font-size': '14px',
        'font-family': 'tahoma',
        'color': 'grey'
      },
      ':focus': {'color': 'blue'},
      ':disabled': {'cursor': 'not-allowed'},
      'valid': {'color': '#3c763d'},
      'invalid': {'color': '#a94442'}
    };
    let flex = new Flex(captureContext);
    let microform = flex.microform({styles: myStyles});
    let number = microform.createField('number', {placeholder: 'Enter card number'});
    let securityCode = microform.createField('securityCode', {placeholder: '...'});

    number.load('#number-container');
    securityCode.load('#securityCode-container');

    let form = document.querySelector('#my-form')
    let payButton = form.querySelector('button');
    let errorsOutput = document.querySelector('#errors-output');

    payButton.addEventListener('click', function () {
      let options = {
        expirationMonth: document.querySelector('#expirationMonth').value,
        expirationYear: document.querySelector('#expirationYear').value
      };
      microform.createToken(options, function (err, token) {
        if (err) {
          // handle error
          console.error(err);
          errorsOutput.textContent = err.message;
        } else {
          // At this point you may pass the token back to your server as you wish.
          // In this example we append a hidden input to the form and submit it.
          const hiddenInput = document.createElement('input');
          hiddenInput.setAttribute('type', 'hidden');
          hiddenInput.setAttribute('name', 'transientToken');
          hiddenInput.setAttribute('value', token);
          form.appendChild(hiddenInput);
          form.submit();
        }
      });
    });

  }

  processPayment() {
    this.paymentApi.startPayment().then({});

  }

  makePayment() {

    console.log("Make Payment Called");

    // Replace this value with the dynamic reference your receive from your SERVER API Call for the paymentSession

    let paymentSession = sessionStorage.paymentSessionReference;
    console.log("Payment Session : " + paymentSession);

    // Payment Options (Must Match the paymentSession Call detail any mismatch will result in an error)

    let configJSON = JSON.parse('{"judoId" : "'
      + sessionStorage.paymentSessionApitoken
      + '","amount" : "'
      + window.amount
      + '","currency" : "'
      + window.currency
      + '","yourConsumerReference" : "'
      + sessionStorage.yourConsumerReference
      + '","yourPaymentReference" : "'
      + sessionStorage.yourPaymentReference + '"}');

    console.log("Invoking Payment With Reference " + sessionStorage.paymentSessionReference);
    console.log("configJSON = ");
    console.table(configJSON);

    // Invokes the Payment (SALE) - for PreAuth use invokePreauth instead (This will need collecting from the server)

    this.judo.invokePayment(sessionStorage.paymentSessionReference, (configJSON))
      .then((response) => {

          // Received a Response

          console.log("Response Received : " + JSON.stringify(response));
          if (response.result === "Success" || response.result === "Declined" || response.result === "Retry") {
            console.log("Response Received");
            console.table(response);

          } else {

            // Response was not what was expected

            console.log("Error : " + JSON.stringify(response))
            console.table(response);

          }
        }
      )
      // Catch Any Error (Transaction Failed)
      .catch((error) => {
        console.log("ERROR CAUGHT " + JSON.stringify(error));
      })
  }


}
