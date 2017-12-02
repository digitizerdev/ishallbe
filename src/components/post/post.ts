import { Component } from '@angular/core';

@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

}
