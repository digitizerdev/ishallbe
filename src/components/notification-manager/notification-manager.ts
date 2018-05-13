import { Component } from '@angular/core';

/**
 * Generated class for the NotificationManagerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'notification-manager',
  templateUrl: 'notification-manager.html'
})
export class NotificationManagerComponent {

  text: string;

  constructor() {
    console.log('Hello NotificationManagerComponent Component');
    this.text = 'Hello World';
  }

}
