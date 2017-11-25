import { Component } from '@angular/core';

/**
 * Generated class for the ContentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'content',
  templateUrl: 'content.html'
})
export class ContentComponent {

  text: string;

  constructor() {
    console.log('Hello ContentComponent Component');
    this.text = 'Hello World';
  }

}
