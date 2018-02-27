import { Component } from '@angular/core';

/**
 * Generated class for the UploadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'upload',
  templateUrl: 'upload.html'
})
export class UploadComponent {

  text: string;

  constructor() {
    console.log('Hello UploadComponent Component');
    this.text = 'Hello World';
  }

}
