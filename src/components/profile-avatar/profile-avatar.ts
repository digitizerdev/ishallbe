import { Component } from '@angular/core';

/**
 * Generated class for the ProfileAvatarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-avatar',
  templateUrl: 'profile-avatar.html'
})
export class ProfileAvatarComponent {

  text: string;

  constructor() {
    console.log('Hello ProfileAvatarComponent Component');
    this.text = 'Hello World';
  }

}
