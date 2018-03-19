import { Component, ViewChild } from '@angular/core';

import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { FCM } from '@ionic-native/fcm';
import { Pro } from '@ionic/pro';

import { Observable } from 'rxjs/Rx';

import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { StatementCreatorPage } from '../pages/statement-creator/statement-creator';
import { GoalCreatorPage } from '../pages/goal-creator/goal-creator';
import { ProfilePage } from '../pages/profile/profile';
import { ExplorePage } from '../pages/explore/explore';
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
  exploreMenuPages: Array<{ title: string, icon: string, component: any }>;
  engageMenuPages: Array<{ title: string, icon: string, component: any }>;
  editorMenuPages: Array<{ title: string, icon: string, component: any }>;
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
    private push: Push,
    private fcm: FCM,
    private firebase: FirebaseProvider,
  ) {
    this.rootPage = LoginPage;
    this.platformReady();
    this.listenToAuthEvents();
    this.exploreMenuPages = [
      {
        title: 'Home',
        icon: 'md-home',
        component: HomePage
      },
      {
        title: 'About',
        icon: 'ios-information-circle',
        component: AboutPage
      },
      {
        title: 'Explore',
        icon: 'md-globe',
        component: ExplorePage
      }
    ];

    this.engageMenuPages = [
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
        title: 'Manage Profile',
        icon: 'ios-person',
        component: ProfilePage
      }
    ];

    this.editorMenuPages = [
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

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  platformReady() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.listenToPushNotificationEvents();
        this.listenToFCMPushNotifications();
        this.deployUpdate().subscribe(() => { this.checkForSession(); });
      } else this.checkForSession();
      this.statusBar.styleDefault();
    });
  }

  deployUpdate() {
    return Observable.create((observer) => {
      Pro.deploy.checkAndApply(true).then((resp) => {
        if (!resp.update) observer.next();
      });
    });
  }

  checkForSession() {
    if (this.firebase.session) this.inSession();
    else {
      this.firebase.sessionExists().subscribe((session) => {
        if (!this.loaded) {
          this.loaded = true;
          if (session) this.inSession();
          else this.splashScreen.hide();
        }
      });
    }
  }

  inSession() {
    this.session = true;
    this.nav.setRoot(HomePage);
    this.splashScreen.hide();
  }

  listenToAuthEvents() {
    this.events.subscribe('login: editor', () => { this.editor = true });
    this.events.subscribe('logout', () => { this.editor = false });
  }

  listenToPushNotificationEvents() {
    if (!this.platform.is('cordova')) {
      return;
    }

    this.push.hasPermission()
      .then((res: any) => {
        if (res.isEnabled) {
        } else { }
      });

    const options: PushOptions = {
      android: {
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'true',
        topics: ['notifications']
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
    }, err => {
    });
  }

  listenToFCMPushNotifications() {
    console.log("Listening FCM Push Notifications")
    this.fcm.getToken().then(token => {
      console.log("Got Token");
      console.log(token);
      this.firebase.fcmToken = token;
    })
    this.fcm.onNotification().subscribe(data => {
      console.log("Got Notification")
      if (data.wasTapped) {
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      };
    })
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log("Token Refreshed ")
    })
  }
}