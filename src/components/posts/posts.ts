import { Component } from '@angular/core';

/**
 * Generated class for the PostsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'posts',
  templateUrl: 'posts.html'
})
export class PostsComponent {

  text: string;

  constructor() {
    console.log('Hello PostsComponent Component');
    this.text = 'Hello World';
  }

}
