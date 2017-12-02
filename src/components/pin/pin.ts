import { Component } from '@angular/core';

@Component({
  selector: 'pin',
  templateUrl: 'pin.html'
})
export class PinComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

}
