import { Component } from '@angular/core';

@Component({
  selector: 'account-email-form',
  templateUrl: 'account-email-form.html'
})
export class AccountEmailFormComponent {

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
