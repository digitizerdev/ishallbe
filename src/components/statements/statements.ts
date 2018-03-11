import { Component } from '@angular/core';

import moment from 'moment';

import { mockStatements } from '../../../test-data/statements/mocks';

@Component({
  selector: 'statements',
  templateUrl: 'statements.html'
})
export class StatementsComponent {

  rawDate: number;
  statements: any[];

  constructor() {
    console.log('Hello Statements Component');
    this.timestamp();
    this.setStatements();
  }

  timestamp() {
    let rawDateString = moment().format('YYYYMMDD');
    this.rawDate = parseInt(rawDateString);
    console.log("Raw date is " + this.rawDate); 
  }

  setStatements() {
    this.statements = [];
    mockStatements.forEach((statement) => {
        console.log("Pushing statement");
        if (this.rawDate > statement.timestamp)
        statement.displayTimestamp = moment(statement.timestamp, "YYYYMMDD").fromNow();
        else statement.displayTimestamp= moment(statement.timestamp, "YYYYMMDDhhmmss").fromNow();
        this.statements.push(statement);
    });
    console.log("Finished pushing statements");
    console.log(this.statements);
  }
}
