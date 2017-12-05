import { Component } from '@angular/core';

/**
 * Generated class for the AccountAvatarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'account-avatar',
  templateUrl: 'account-avatar.html'
})
export class AccountAvatarComponent {

  text: string;

  constructor() {
    console.log('Hello AccountAvatarComponent Component');
    this.text = 'Hello World';
  }

}
