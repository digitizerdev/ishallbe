import { Component } from '@angular/core';

@Component({
  selector: 'login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {

  submission: { 
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
  }

  submissionError(error) {
    this.error = error;
  }


}
