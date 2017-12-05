import { Component } from '@angular/core';

/**
 * Generated class for the PinsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pins',
  templateUrl: 'pins.html'
})
export class PinsComponent {

  text: string;

  constructor() {
    console.log('Hello PinsComponent Component');
    this.text = 'Hello World';
  }

}
