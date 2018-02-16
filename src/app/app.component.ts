import { NgModule, Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Pro } from '@ionic/pro';

import { Observable } from 'rxjs/Rx';

import { SignupPage } from '../pages/signup/signup';
import { PasswordResetPage } from '../pages/password-reset/password-reset';
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { SupportPage } from '../pages/support/support';
import { EmailUpdatePage } from '../pages/email-update/email-update';
import { PasswordUpdatePage } from '../pages/password-update/password-update';
import { AccountPage } from '../pages/account/account';
import { NotificationsPage } from '../pages/notifications/notifications';
import { ProfileUpdatePage } from '../pages/profile-update/profile-update';
import { StatementCreatorPage } from '../pages/statement-creator/statement-creator';
import { GoalCreatorPage } from '../pages/goal-creator/goal-creator';
import { ProfilePage } from '../pages/profile/profile';
import { PostPage } from '../pages/post/post';
import { ExplorePage } from '../pages/explore/explore';
import { HomePage } from '../pages/home/home';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { PinCreatorPage } from '../pages/pin-creator/pin-creator';
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
    private alertCtrl: AlertController,
    private events: Events,
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
}