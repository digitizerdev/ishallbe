import { Component } from '@angular/core';

/**
 * Generated class for the NotificationCreatorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'notification-creator',
  templateUrl: 'notification-creator.html'
})
export class NotificationCreatorComponent {

  text: string;

  constructor() {
    console.log('Hello NotificationCreatorComponent Component');
    this.text = 'Hello World';
  }

}
