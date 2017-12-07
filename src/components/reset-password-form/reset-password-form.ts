import { Component } from '@angular/core';

@Component({
  selector: 'reset-password-form',
  templateUrl: 'reset-password-form.html'
})
export class ResetPasswordFormComponent {

  submission: { 
    email?: string, 
  } = {};
  submitted = false;
  error: any;

  constructor() {
  }

  submit(submission) {
    this.submission = submission;
    this.submitted = true;
  }

}
