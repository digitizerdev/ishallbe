import { Component } from '@angular/core';

@Component({
  selector: 'support-form',
  templateUrl: 'support-form.html'
})
export class SupportFormComponent {

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
