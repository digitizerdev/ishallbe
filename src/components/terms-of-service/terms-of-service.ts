import { Component } from '@angular/core';

/**
 * Generated class for the TermsOfServiceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'terms-of-service',
  templateUrl: 'terms-of-service.html'
})
export class TermsOfServiceComponent {

  text: string;

  constructor() {
    console.log('Hello TermsOfServiceComponent Component');
    this.text = 'Hello World';
  }

}
