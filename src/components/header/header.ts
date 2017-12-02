import { Component } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

}
