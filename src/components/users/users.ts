import { Component } from '@angular/core';

/**
 * Generated class for the UsersComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'users',
  templateUrl: 'users.html'
})
export class UsersComponent {

  text: string;

  constructor() {
    console.log('Hello UsersComponent Component');
    this.text = 'Hello World';
  }

}
