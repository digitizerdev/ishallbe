import { Component } from '@angular/core';

import { mockPosts } from '../../../test-data/posts/mocks';

@Component({
  selector: 'statements',
  templateUrl: 'statements.html'
})
export class StatementsComponent {

  statements: any[];

  constructor() {
    console.log('Hello Statements Component');
    this.statements = [];
    mockPosts.forEach((post) => {
      if (post.statement) {
        console.log("Pushing statement");
        this.statements.push(post);
      }
    });
    console.log("Finished pushing statements");
    console.log(this.statements);
  }
}
