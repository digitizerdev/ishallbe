import { Component } from '@angular/core';
import { App, AlertController, LoadingController, MenuController, NavController, NavParams, Platform} from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  signup: {username?: string, name?: string, email?: string, password?: string, confirmPassword?: string} = {};

  public chat: any;

  constructor(
    public menu: MenuController,
    public app: App,
    public loading: LoadingController,
    public alert: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,    
  ) {
  }
}
