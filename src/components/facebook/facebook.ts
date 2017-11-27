import { Component } from '@angular/core';

/**
 * Generated class for the FacebookComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'facebook',
  templateUrl: 'facebook.html'
})
export class FacebookComponent {

  text: string;

  constructor() {
    console.log('Hello FacebookComponent Component');
    this.text = 'Hello World';
  }

}
