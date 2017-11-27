import { Component } from '@angular/core';

/**
 * Generated class for the StorageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'storage',
  templateUrl: 'storage.html'
})
export class StorageComponent {

  text: string;

  constructor() {
    console.log('Hello StorageComponent Component');
    this.text = 'Hello World';
  }

}
