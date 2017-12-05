import { Component } from '@angular/core';

/**
 * Generated class for the PinManagerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pin-manager',
  templateUrl: 'pin-manager.html'
})
export class PinManagerComponent {

  text: string;

  constructor() {
    console.log('Hello PinManagerComponent Component');
    this.text = 'Hello World';
  }

}
