import { Component, ViewChild } from '@angular/core';

import { Nav, Platform, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';
import { Pro } from '@ionic/pro';

import { Observable } from 'rxjs/Rx';

import { StartupPage } from '../pages/startup/startup';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { IshallbetvPage } from '../pages/ishallbetv/ishallbetv';
import { ProfilePage } from '../pages/profile/profile';
import { GoalCreatorPage } from '../pages/goal-creator/goal-creator';
import { StatementCreatorPage } from '../pages/statement-creator/statement-creator';
import { AccountPage } from '../pages/account/account';
import { PostManagerPage } from '../pages/post-manager/post-manager';
import { UserManagerPage } from '../pages/user-manager/user-manager';
import { ApiManagerPage } from '../pages/api-manager/api-manager';
import { TutorialPage } from '../pages/tutorial/tutorial';

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
  editor = false;
  ready = false;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private events: Events,
    private alertCtrl: AlertController,
    private fcm: FCM,
    private firebase: FirebaseProvider,
  ) {
    this.listenToUserPermissionsEvents();
    this.rootPage = StartupPage;
    this.platformReady();
    this.setMenus();
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  platformReady() {
    this.platform.ready().then(() => {
      this.ready = true;
      if (!this.platform.is('cordova'))
        this.startup();
      else
        this.initDevicePlatform();
    });
  }

  startup() {
    this.fcm.subscribeToTopic('affirmations');
    this.nav.setRoot(StartupPage);
    this.splashScreen.hide();
  }

  initDevicePlatform() {
    this.splashScreen.show();
    this.statusBar.styleDefault();
    this.listenToFCMPushNotifications();
    this.deployUpdate().subscribe((updateAvailable) => {
      if (!updateAvailable)
        this.startup();
    });
  }

  deployUpdate() {
    return Observable.create((observer) => {
      return Pro.deploy.checkAndApply(true).then((resp) => {
        if (resp.update) observer.next(true);
        else observer.next(false);
      });
    });
  }

  listenToFCMPushNotifications() {
    this.fcm.getToken().then(token =>
      this.firebase.fcmToken = token);
    this.fcm.onNotification().subscribe(notification => {
      if (!notification.wasTapped)
        this.displayNotificationAlert(notification);
    });
    this.fcm.onTokenRefresh().subscribe(token =>
      this.firebase.fcmToken = token);
  }

  listenToUserPermissionsEvents() {
    this.listenToTutorialLaunchEvents();
    this.listenToAccessControlEvents();
    this.listenToEditorPermissionEvents();
    this.listenToContributorPermissionEvents();
  }

  listenToTutorialLaunchEvents() {
    console.log("Listening to tutorial launch events");
    this.events.subscribe('show tutorial', () => {
      console.log("Launching Tutorial");
      this.nav.setRoot(TutorialPage);
    });
  }

  listenToAccessControlEvents() {
    this.events.subscribe('user blocked', () => {
      this.nav.setRoot(LoginPage);
      this.fcm.unsubscribeFromTopic('affirmations');
      if (this.editor) {
        this.editor = false;
        this.fcm.unsubscribeFromTopic('editor');
      }
    });
  }

  listenToEditorPermissionEvents() {
    this.events.subscribe('editor permission granted', () => {
      this.fcm.subscribeToTopic('editor');
      this.editor = true;
    });
    this.events.subscribe('editor permission not granted', () => {
      this.fcm.unsubscribeFromTopic('editor');
      this.editor = false;
    });
  }

  listenToContributorPermissionEvents() {
    this.events.subscribe('contributor permission granted', () => {
      this.fcm.subscribeToTopic('affirmations');
      if (this.ready) this.nav.setRoot(StartupPage);
    });
    this.events.subscribe('contributor permission not granted', () => {
      this.nav.setRoot(LoginPage);
      this.editor = false;
    });
  }

  displayNotificationAlert(notification) {
    let alert = this.alertCtrl.create({
      title: 'Notification',
      subTitle: notification.aps.alert.title,
      buttons: ['OPEN']
    });
    alert.present();
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
        title: 'Post Manager',
        icon: 'ios-albums',
        component: PostManagerPage
      },
      {
        title: 'User Manager',
        icon: 'ios-people',
        component: UserManagerPage
      },
      {
        title: 'API Manager',
        icon: 'ios-pulse',
        component: ApiManagerPage
      }
    ];
  }
}