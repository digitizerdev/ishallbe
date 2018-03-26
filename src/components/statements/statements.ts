import { Component, Input } from '@angular/core';

import { NavController } from 'ionic-angular';

import moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { PostPage } from '../../pages/post/post';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'statements',
  templateUrl: 'statements.html'
})
export class StatementsComponent {
  @Input('mine') myStatements;

  rawDate: number;
  statements: any[];

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
  }

  ngAfterViewInit() {
    console.log("Statements View Initialized");
    console.log("My Statments: " + this.myStatements);
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

  viewStatement(id) {
    console.log("Viewing Statement");
    console.log(id);
    this.navCtrl.push(PostPage, { 
      id: id,
      type: "statement"
     });
  }
}