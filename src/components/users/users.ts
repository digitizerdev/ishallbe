import { Component } from '@angular/core';

@Component({
  selector: 'users',
  templateUrl: 'users.html'
})
export class UsersComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

}
