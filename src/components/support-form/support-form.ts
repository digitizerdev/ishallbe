import { Component } from '@angular/core';

/**
 * Generated class for the SupportFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'support-form',
  templateUrl: 'support-form.html'
})
export class SupportFormComponent {

  text: string;

  constructor() {
    console.log('Hello SupportFormComponent Component');
    this.text = 'Hello World';
  }

}
