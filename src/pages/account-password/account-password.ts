import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-account-password',
  templateUrl: 'account-password.html',
})
export class AccountPasswordPage {

  title = 'Update Password';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

}
