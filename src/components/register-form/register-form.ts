import { Component } from '@angular/core';

@Component({
  selector: 'register-form',
  templateUrl: 'register-form.html'
})
export class RegisterFormComponent {

  submission: { 
    name?: string,
    email?: string, 
    password?: string 
  } = {};
  submitted = false;
  error: any;

  constructor() {
    
  }

  submit(submission) {
    this.submission = submission;
    this.submitted = true;
    this.auth(this.submission.name, this.submission.email, this.submission.password);
  }

  auth(name, email, password) {

  }
}
