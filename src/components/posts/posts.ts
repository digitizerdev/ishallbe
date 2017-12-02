import { Component } from '@angular/core';

@Component({
  selector: 'posts',
  templateUrl: 'posts.html'
})
export class PostsComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

}
