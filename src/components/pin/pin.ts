import { Component } from '@angular/core';

/**
 * Generated class for the PinComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pin',
  templateUrl: 'pin.html'
})
export class PinComponent {

  text: string;

  constructor() {
    console.log('Hello PinComponent Component');
    this.text = 'Hello World';
  }

}
