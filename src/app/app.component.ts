import { Component, ViewChild } from '@angular/core';

import { Nav, NavController, Platform, Events, ToastController, AlertController } from 'ionic-angular';
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
import { NotificationManagerPage } from '../pages/notification-manager/notification-manager';
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
  adminMenu: Array<{ title: string, icon: string, component: any }>;
  providers: Array<{ title: string, component: any }>;
  pages: Array<{ title: string, component: any }>;
  editor = false;
  blocked = false;

  constructor(
    private platform: Platform,
    private alertCtrl: AlertController,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private events: Events,
    private toastCtrl: ToastController,
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
    console.log("Listening To FCM Notifications");
    this.subscribeToPings();
    this.events.subscribe('fcm synced', () => {
      this.fcm.onNotification().subscribe(notification => {
        console.log("Got Notification");
        console.log(notification);
        this.firebase.notification = true;
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

  subscribeToPings() {
    console.log("Subscribing to Pings");
    this.fcm.subscribeToTopic('pings').then((resp) => {
      console.log("Subscribed to pings");
      console.log(resp);
    }).catch((error) => {
      console.log("Error subscribing to pings");
      console.log(error);
    });
  }

  displayNotificationAlert(notification) {
    console.log("Displaying Notification Alert");
    console.log("Subtitle is " + notification.aps.alert);
    let toast = this.toastCtrl.create({
      message: notification.aps.alert,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  listenToUserPermissionsEvents() {
    this.listenToTutorialLaunchEvents();
    this.listenToAccessControlEvents();
    this.listenToEditorPermissionEvents();
    this.listenToContributorPermissionEvents();
  }

  listenToTutorialLaunchEvents() {
    this.events.subscribe('show tutorial', () => {
      if (!this.blocked) this.nav.setRoot(TutorialPage);
    });
  }

  listenToAccessControlEvents() {
    this.events.subscribe('user blocked', () => {
      this.blocked = true;
      this.nav.setRoot(LoginPage);
      this.fcm.unsubscribeFromTopic('affirmations');
      if (this.editor) {
        this.editor = false;
      }
    });
    this.events.subscribe('access denied', () => {
      this.blocked = true;
      this.nav.setRoot(LoginPage);
      this.firebase.endSession();
      let alert = this.alertCtrl.create({
        title: 'Access Denied',
        message: 'Download iShallBe on the iOS App Store and Google Play',
        buttons: [
          {
            text: 'Okay'
          }
        ]
      });
      alert.present();
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
      if (this.firebase.notification) {
        this.nav.setRoot(NotificationsPage);
      } else {
        this.nav.setRoot(HomePage);
      }
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
        title: 'Profile',
        icon: 'ios-person',
        component: ProfilePage
      }
    ];
    this.accountMenu = [
      {
        title: 'Create Statement',
        icon: 'ios-camera',
        component: StatementCreatorPage
      },
      {
        title: 'Create Goal',
        icon: 'ios-microphone',
        component: GoalCreatorPage
      },
      {
        title: 'Account',
        icon: 'ios-settings',
        component: AccountPage
      }
    ];

    this.editorMenu = [
      {
        title: 'Posts',
        icon: 'ios-albums',
        component: PostManagerPage
      },
      {
        title: 'Notifications',
        icon: 'ios-alert',
        component: NotificationManagerPage
      }
    ];

    this.adminMenu = [
      {
        title: 'Users',
        icon: 'ios-people',
        component: UserManagerPage
      },
      {
        title: 'API',
        icon: 'ios-pulse',
        component: ApiManagerPage
      }
    ];
  }
}