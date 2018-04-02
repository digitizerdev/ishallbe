import { Component, Input } from '@angular/core';

import { NavController } from 'ionic-angular';

import { PostPage } from '../../pages/post/post';

@Component({
  selector: 'statement',
  templateUrl: 'statement.html'
})
export class StatementComponent {
  @Input('post') statement;
  reported = false;

  constructor(
    private navCtrl: NavController
  ) {
    console.log('Hello StatementComponent Component');
  }

  ngOnInit() {
    this.reported = this.statement.reported;
    console.log("Reported: " + this.reported);
  }

  viewStatement() {
    this.navCtrl.push(PostPage, { 
      id: this.statement.id,
      type: "statements"
     });
  }

}
