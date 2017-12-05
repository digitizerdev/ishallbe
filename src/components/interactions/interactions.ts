import { Component } from '@angular/core';

/**
 * Generated class for the InteractionsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'interactions',
  templateUrl: 'interactions.html'
})
export class InteractionsComponent {

  text: string;

  constructor() {
    console.log('Hello InteractionsComponent Component');
    this.text = 'Hello World';
  }

}
