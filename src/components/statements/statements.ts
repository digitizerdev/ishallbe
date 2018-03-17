import { Component } from '@angular/core';

import moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'statements',
  templateUrl: 'statements.html'
})
export class StatementsComponent {

  rawDate: number;
  statements: any[];

  constructor(
    private firebase: FirebaseProvider
  ) {
    console.log("Statements View Initialized")
    this.timestamp();
    this.loadStatements().subscribe((statements) => {
      console.log("Got statements");
      console.log(statements);
      this.setStatements(statements);
    });
  }

  timestamp() {
    let rawDateString = moment().format('YYYYMMDD');
    this.rawDate = parseInt(rawDateString);
  }

  loadStatements() {
    console.log("Loading Statements");
    return Observable.create((observer) => {
      let allStatements = this.firebase.afs.collection('statements', ref => ref.orderBy('timestamp'));
      allStatements.valueChanges().subscribe((statements) => {
        observer.next(statements);
      });
    });
  }

  setStatements(statements) {
    this.statements = [];
    statements.forEach((statement) => {
      let date = moment.unix(statement.timestamp);
      statement.displayTimestamp = moment(date).fromNow();
      this.statements.push(statement);
    });
  }
}
