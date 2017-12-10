import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-account-email',
  templateUrl: 'account-email.html',
})
export class AccountEmailPage {

  title = 'Update Email';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

}
