import { Component } from '@angular/core';

@Component({
  selector: 'media',
  templateUrl: 'media.html'
})
export class MediaComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

}
