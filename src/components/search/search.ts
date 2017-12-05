import { Component } from '@angular/core';

/**
 * Generated class for the SearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search',
  templateUrl: 'search.html'
})
export class SearchComponent {

  text: string;

  constructor() {
    console.log('Hello SearchComponent Component');
    this.text = 'Hello World';
  }

}
