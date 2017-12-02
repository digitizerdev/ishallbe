import { Component } from '@angular/core';

@Component({
  selector: 'facebook',
  templateUrl: 'facebook.html'
})
export class FacebookComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

}
