import { Component, ViewChild } from '@angular/core';

import { Nav, Platform, Events, AlertController } from 'ionic-angular';
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
import { PostPage } from '../pages/post/post';
import { ChatPage } from '../pages/chat/chat';
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

  rootPage: StartupPage;
  affirmationsMenu: Array<{ title: string, icon: string, component: any }>;
  accountMenu: Array<{ title: string, icon: string, component: any }>;
  editorMenu: Array<{ title: string, icon: string, component: any }>;
  providers: Array<{ title: string, component: any }>;
  pages: Array<{ title: string, component: any }>;
  notification: any;
  tappedNotification = false;
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
      console.log("Platform Ready");
      this.ready = true;
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  displayNotificationAlert(notification) {
    console.log("Displaying Notification Alert");
    console.log("Aler subtitle is " + notification.aps.alert);
    let alert = this.alertCtrl.create({
      title: 'Notification',
      subTitle: notification.aps.alert,
      buttons: [
        {
          text: 'Dismiss',
          handler: () => {
            console.log("Dismissed");
          }
        },
        {
          text: 'Open',
          handler: () => {
            this.openNotification(notification)
          }
        }]
    });
    alert.present();
  }

  openNotification(notification) {
    console.log("Opening Notification");
    console.log(notification);
    let notificationId = notification.id
    console.log("Notification ID is " + notificationId);
    let notificationPath = "notifications/" + notification.id;
    console.log("Notification Path is " + notificationPath);
    this.firebase.afs.doc(notificationPath).update({ read: true }).then(() => {
      let notificationCollection = notification.collection;
      console.log("Notification collection is " + notificationCollection);
      if (notificationCollection == "pins")
        this.openPin(notification.docId);
      if (notificationCollection == "statements")
        this.openStatement(notification.docId);
      if (notificationCollection == "goals")
        this.openGoal(notification.docId);
      if (notification.message == "message")
        this.openChat(notification.docId);
    });
  }

  openPin(docId) {
    console.log("Opening Pin");
    console.log("Doc Id is " + docId);
    this.nav.push(PostPage, {
      id: docId,
      type: "pins"
    });
  }

  openStatement(docId) {
    console.log("Opening Statement");
    console.log("Doc Id is " + docId);
    this.nav.push(PostPage, {
      id: docId,
      type: "statements"
    });
  }

  openGoal(docId) {
    console.log("Opening Goal");
    console.log("Doc Id is " + docId);
    this.nav.push(PostPage, {
      id: docId,
      type: "goals"
    });
  }

  openChat(docId) {
    console.log("Opening Chat");
    console.log("Doc Id is " + docId);
    this.nav.push(ChatPage, {
      uid: docId,
    });
  }

  listenToUserPermissionsEvents() {
    console.log("Listening To User Permission Events");
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
      console.log("Contributor Permission Granted");
      if (this.platform.is('cordova')) this.listenToFCMPushNotifications();
      if (this.tappedNotification) {
        if (this.notification.collection == "pins")
          this.openPin(this.notification.docId);
        if (this.notification.collection == "statements")
          this.openStatement(this.notification.docId);
        if (this.notification.collection == "goals")
          this.openGoal(this.notification.docId);
        if (this.notification.message == "message")
          this.openChat(this.notification.docId);
      } else {
         this.nav.setRoot(HomePage);
      }
    });
    this.events.subscribe('contributor permission not granted', () => {
      console.log("Contributor Permission Not Granted");
      this.nav.setRoot(LoginPage);
      this.editor = false;
    });
  }

  listenToFCMPushNotifications() {
    console.log("Listening to Push Notifications");
    this.fcm.getToken().then(token =>
      this.firebase.fcmToken = token);
    this.fcm.onNotification().subscribe(notification => {
      if (notification.wasTapped) {
        console.log("Notification was tapped");
        this.tappedNotification = true;
        this.notification = notification;
        this.openNotification(notification);
      }
      else {
        console.log("Notification was not tapped");
        this.displayNotificationAlert(notification);
      }
    });
    this.fcm.subscribeToTopic('affirmations');
    this.fcm.onTokenRefresh().subscribe(token =>
      this.firebase.fcmToken = token);
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