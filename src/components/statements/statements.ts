import { Component } from '@angular/core';

import moment from 'moment';

import { mockPosts } from '../../../test-data/posts/mocks';

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
    mockPosts.forEach((post) => {
      if (post.statement) {
        console.log("Pushing statement");
        if (this.rawDate > post.timestamp.rawDate)  
        post.timestamp.displayTime = moment(post.timestamp.rawDate, "YYYYMMDD").fromNow();
        else post.timestamp.displayTime = moment(post.timestamp.rawTime, "YYYYMMDDhhmmss").fromNow();
        this.statements.push(post);
      }
    });
    console.log("Finished pushing statements");
    console.log(this.statements);
  }
}
