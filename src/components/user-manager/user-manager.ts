import { Component } from '@angular/core';

/**
 * Generated class for the UserManagerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'user-manager',
  templateUrl: 'user-manager.html'
})
export class UserManagerComponent {

  text: string;

  constructor() {
    console.log('Hello UserManagerComponent Component');
    this.text = 'Hello World';
  }

}
