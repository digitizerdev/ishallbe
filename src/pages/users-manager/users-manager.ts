import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-users-manager',
  templateUrl: 'users-manager.html',
})
export class UsersManagerPage {

  title = 'Manage Users'

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersManagerPage');
  }

}
