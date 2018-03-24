import { Component } from '@angular/core';

/**
 * Generated class for the ToolbarLogoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'toolbar-logo',
  templateUrl: 'toolbar-logo.html'
})
export class ToolbarLogoComponent {

  text: string;

  constructor() {
    console.log('Hello ToolbarLogoComponent Component');
    this.text = 'Hello World';
  }

}
