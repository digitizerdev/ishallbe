import { Component } from '@angular/core';

/**
 * Generated class for the PhotoComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'photo',
  templateUrl: 'photo.html'
})
export class PhotoComponent {

  text: string;

  constructor() {
    console.log('Hello PhotoComponent Component');
    this.text = 'Hello World';
  }

}
