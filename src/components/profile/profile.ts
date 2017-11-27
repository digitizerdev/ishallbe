import { Component } from '@angular/core';

/**
 * Generated class for the ProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class ProfileComponent {

  text: string;

  constructor() {
    console.log('Hello ProfileComponent Component');
    this.text = 'Hello World';
  }

}
