import { Component } from '@angular/core';

/**
 * Generated class for the RegisterFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'register-form',
  templateUrl: 'register-form.html'
})
export class RegisterFormComponent {

  text: string;

  constructor() {
    console.log('Hello RegisterFormComponent Component');
    this.text = 'Hello World';
  }

}
