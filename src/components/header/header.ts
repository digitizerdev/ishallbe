import { Component } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  text: string;

  constructor() {
    console.log('Hello HeaderComponent Component');
    this.text = 'Hello World';
  }

}
