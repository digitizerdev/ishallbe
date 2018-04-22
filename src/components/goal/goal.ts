import { Component, Input } from '@angular/core';

import { NavController } from 'ionic-angular';

import { PostPage } from '../../pages/post/post';

@Component({
  selector: 'goal',
  templateUrl: 'goal.html'
})
export class GoalComponent {
  @Input('post') goal;

  constructor(
    private navCtrl: NavController
  ) {}

  viewGoal() {
    this.navCtrl.push(PostPage, { 
      id: this.goal.id,
      type: "goals",
      opened: true
     });
  }
}
