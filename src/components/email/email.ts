import { Component } from '@angular/core';

/**
 * Generated class for the EmailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'email',
  templateUrl: 'email.html'
})
export class EmailComponent {

  text: string;

  constructor() {
    console.log('Hello EmailComponent Component');
    this.text = 'Hello World';
  }

}
