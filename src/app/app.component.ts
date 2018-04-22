import { Component, ViewChild } from '@angular/core';

import { Nav, NavController, Platform, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';

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
import { NotificationsPage } from '../pages/notifications/notifications';

import { FirebaseProvider } from '../providers/firebase/firebase';

@Component({
  templateUrl: 'app.component.html',
})
export class iShallBe {

  @ViewChild(Nav) nav: Nav;
  @ViewChild('myNav') navCtrl: NavController;

  rootPage: StartupPage;
  affirmationsMenu: Array<{ title: string, icon: string, component: any }>;
  accountMenu: Array<{ title: string, icon: string, component: any }>;
  editorMenu: Array<{ title: string, icon: string, component: any }>;
  providers: Array<{ title: string, component: any }>;
  pages: Array<{ title: string, component: any }>;
  notification: any;
  editor = false;

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
    this.platformReady();
    this.setMenus();
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  platformReady() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      if (this.platform.is('cordova')) {
        this.statusBar.styleDefault();
        this.listenToFCMPushNotifications();
      }
    });
  }

  listenToFCMPushNotifications() {
    this.events.subscribe('fcm synced', () => {
      this.fcm.onNotification().subscribe(notification => {
        if (notification.wasTapped) {
          let notificationPath = "notifications/" + notification.id;
          this.nav.setRoot(NotificationsPage);
          this.firebase.afs.doc(notificationPath).update({ read: true });
        }
        else {
          this.displayNotificationAlert(notification);
        }
      });
    });
  }

  displayNotificationAlert(notification) {
    let alert = this.alertCtrl.create({
      title: 'Notification',
      subTitle: notification.aps.alert,
      buttons: [
        {
          text: 'Dismiss',
          handler: () => {
          }
        },
        {
          text: 'Open',
          handler: () => {
            this.nav.setRoot(NotificationsPage);
          }
        }]
    });
    alert.present();
  }

  listenToUserPermissionsEvents() {
    this.listenToTutorialLaunchEvents();
    this.listenToAccessControlEvents();
    this.listenToEditorPermissionEvents();
    this.listenToContributorPermissionEvents();
  }

  listenToTutorialLaunchEvents() {
    this.events.subscribe('show tutorial', () => {
      this.nav.setRoot(TutorialPage);
    });
  }

  listenToAccessControlEvents() {
    this.events.subscribe('user blocked', () => {
      this.nav.setRoot(LoginPage);
      this.fcm.unsubscribeFromTopic('affirmations');
      if (this.editor) {
        this.editor = false;
      }
    });
  }

  listenToEditorPermissionEvents() {
    this.events.subscribe('editor permission granted', () => {
      this.editor = true;
    });
    this.events.subscribe('editor permission not granted', () => {
      this.editor = false;
    });
  }

  listenToContributorPermissionEvents() {
    this.events.subscribe('contributor permission granted', () => {
      this.nav.setRoot(HomePage);
    });
    this.events.subscribe('contributor permission not granted', () => {
      this.nav.setRoot(LoginPage);
      this.editor = false;
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