import { Component } from '@angular/core';

/**
 * Generated class for the CreateStatementFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'create-statement-form',
  templateUrl: 'create-statement-form.html'
})
export class CreateStatementFormComponent {

  text: string;

  constructor() {
    console.log('Hello CreateStatementFormComponent Component');
    this.text = 'Hello World';
  }

}
