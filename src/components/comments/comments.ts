import { Component } from '@angular/core';

@Component({
  selector: 'comments',
  templateUrl: 'comments.html'
})
export class CommentsComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

}
