import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-posts-manager',
  templateUrl: 'posts-manager.html',
})
export class PostsManagerPage {

  title = 'Manage Posts';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostsManagerPage');
  }

}
