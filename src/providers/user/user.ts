import { Injectable } from '@angular/core';
import { App, AlertController, LoadingController, Events, Platform, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { Facebook } from '@ionic-native/facebook';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';

@Injectable()
export class UserProvider {

  constructor(        
    public app: App,
    public platform: Platform,
    public alert: AlertController,
    public loader: LoadingController,
    public toast: ToastController,
    public storage: Storage,
    public events: Events,
    public facebook: Facebook,
    public file: File,
   ) {
  }
}