import { Component } from '@angular/core';

/**
 * Generated class for the ProfileManagerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-manager',
  templateUrl: 'profile-manager.html'
})
export class ProfileManagerComponent {

  text: string;

  constructor() {
    console.log('Hello ProfileManagerComponent Component');
    this.text = 'Hello World';
  }

}
