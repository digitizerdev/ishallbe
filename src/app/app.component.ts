import { Component, ViewChild } from '@angular/core';

import { Nav, Platform, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';
import { Pro } from '@ionic/pro';

import { Observable } from 'rxjs/Rx';

import { StartupPage } from '../pages/startup/startup';
import { AccountPage } from '../pages/account/account';
import { StatementCreatorPage } from '../pages/statement-creator/statement-creator';
import { GoalCreatorPage } from '../pages/goal-creator/goal-creator';
import { ProfilePage } from '../pages/profile/profile';
import { IshallbetvPage } from '../pages/ishallbetv/ishallbetv';
import { HomePage } from '../pages/home/home';
import { ApiManagerPage } from '../pages/api-manager/api-manager';
import { PostManagerPage } from '../pages/post-manager/post-manager';
import { UserManagerPage } from '../pages/user-manager/user-manager';

import { FirebaseProvider } from '../providers/firebase/firebase';

@Component({
  templateUrl: 'app.component.html',
})
export class iShallBe {

  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  affirmationsMenu: Array<{ title: string, icon: string, component: any }>;
  accountMenu: Array<{ title: string, icon: string, component: any }>;
  editorMenu: Array<{ title: string, icon: string, component: any }>;
  providers: Array<{ title: string, component: any }>;
  pages: Array<{ title: string, component: any }>;
  session = false;
  editor = false;
  loaded = false;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private events: Events,
    private alertCtrl: AlertController,
    private fcm: FCM,
    private firebase: FirebaseProvider,
  ) {
    this.rootPage = StartupPage;
    this.platformReady();
    this.setMenus();
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  platformReady() {
    this.platform.ready().then(() => {
      this.listenToEditorLogin();
      if (this.platform.is('cordova'))
        this.initDevicePlatforms();
      else this.splashScreen.hide();
    });
  }

  initDevicePlatforms() {
    this.statusBar.styleDefault();
    this.listenToFCMPushNotifications();
    this.deployUpdate().subscribe(() =>
      this.splashScreen.hide());
  }

  listenToEditorLogin() {
    this.events.subscribe('login: editor', () =>
      this.editor = true);
    this.events.subscribe('logout', () =>
      this.editor = false);
  }

  listenToFCMPushNotifications() {
    this.fcm.getToken().then(token => {
      console.log("Got token");
      console.log(token);
      this.firebase.fcmToken = token;
    });
    this.fcm.onNotification().subscribe(notification => {
      console.log("Received a notification");
      console.log(notification);
      if (!notification.wasTapped)
        this.displayNotificationAlert(notification)
    });
    this.fcm.onTokenRefresh().subscribe(token =>
      this.firebase.fcmToken = token);
  }

  displayNotificationAlert(notification) {
    console.log("Displaying Notification Alert");
    let alert = this.alertCtrl.create({
      title: 'Notification',
      subTitle: notification.message,
      buttons: ['OK']
    });
    console.log("Built Alert");
    console.log(alert);
    alert.present();
  }

  deployUpdate() {
    return Observable.create((observer) => {
      Pro.deploy.checkAndApply(true).then((resp) => {
        if (!resp.update) observer.next();
      });
    });
  }

  setMenus() {
    this.affirmationsMenu = [
      {
        title: 'Home',
        icon: 'md-home',
        component: HomePage
      },
      {
        title: 'iShallBe TV',
        icon: 'ios-desktop',
        component: IshallbetvPage
      },
      {
        title: 'Manage Profile',
        icon: 'ios-person',
        component: ProfilePage
      }
    ];
    this.accountMenu = [
      {
        title: 'Create Goal',
        icon: 'ios-microphone',
        component: GoalCreatorPage
      },
      {
        title: 'Create Statement',
        icon: 'ios-camera',
        component: StatementCreatorPage
      },
      {
        title: 'Manage Account',
        icon: 'ios-settings',
        component: AccountPage
      }
    ];
    this.editorMenu = [
      {
        title: 'User Manager',
        icon: 'ios-people',
        component: UserManagerPage
      },
      {
        title: 'Post Manager',
        icon: 'ios-albums',
        component: PostManagerPage
      },
      {
        title: 'API Manager',
        icon: 'ios-pulse',
        component: ApiManagerPage
      }
    ];
  }
}