import { Component } from '@angular/core';

/**
 * Generated class for the PostManagerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'post-manager',
  templateUrl: 'post-manager.html'
})
export class PostManagerComponent {

  text: string;

  constructor() {
    console.log('Hello PostManagerComponent Component');
    this.text = 'Hello World';
  }

}
