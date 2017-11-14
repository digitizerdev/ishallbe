import { Component } from '@angular/core';
import { App, AlertController, LoadingController, NavController, NavParams, Platform, MenuController, Events} from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {email?: string, password?: string} = {};

  constructor(
    public app: App,
    public loading: LoadingController,
    public alert: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public menu: MenuController,
    public event: Events 
  ) {
  }
  ionViewDidLoad(){
  }
}
