import { Component } from '@angular/core';

@Component({
  selector: 'account-password-form',
  templateUrl: 'account-password-form.html'
})
export class AccountPasswordFormComponent {

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
