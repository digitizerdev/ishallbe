import { Component } from '@angular/core';

@Component({
  selector: 'toolbar-logo',
  templateUrl: 'toolbar-logo.html'
})
export class ToolbarLogoComponent {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

}
