import {HttpClient} from 'aurelia-http-client';

let httpClient = new HttpClient();

httpClient.configure(x => {
  x.withBaseUrl("/receipt")
    .asPost();
  // withInterceptor({
  //   request(message) {
  //     return message;
  //   },
  //
  //   requestError(error) {
  //     throw error;
  //   },
  //
  //   response(message) {
  //     return message;
  //   },
  //
  //   responseError(error) {
  //     throw error;
  //   }
  // })
  //   .asPost();
});
