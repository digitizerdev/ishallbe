import { Component } from '@angular/core';

/**
 * Generated class for the ProfilePostsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile-posts',
  templateUrl: 'profile-posts.html'
})
export class ProfilePostsComponent {

  text: string;

  constructor() {
    console.log('Hello ProfilePostsComponent Component');
    this.text = 'Hello World';
  }

}
