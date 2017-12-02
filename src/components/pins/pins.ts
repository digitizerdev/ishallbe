import { Component } from '@angular/core';

@Component({
  selector: 'pins',
  templateUrl: 'pins.html'
})
export class PinsComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

}
