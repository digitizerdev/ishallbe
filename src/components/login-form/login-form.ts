import { Component } from '@angular/core';

import { FirebaseProvider } from '../../providers/firebase/firebase';

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

  constructor(
    public firebase: FirebaseProvider
  ) {
  }

  submit(submission) {
    this.submission = submission;
    this.submitted = true;
    this.firebase.emailAuth(this.submission);
  }

  submissionError(error) {
    this.error = error;
  }


}
