import { Component } from '@angular/core';

/**
 * Generated class for the ReportManagerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'report-manager',
  templateUrl: 'report-manager.html'
})
export class ReportManagerComponent {

  text: string;

  constructor() {
    console.log('Hello ReportManagerComponent Component');
    this.text = 'Hello World';
  }

}
