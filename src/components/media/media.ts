import { Component } from '@angular/core';

/**
 * Generated class for the MediaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'media',
  templateUrl: 'media.html'
})
export class MediaComponent {

  text: string;

  constructor() {
    console.log('Hello MediaComponent Component');
    this.text = 'Hello World';
  }

}
