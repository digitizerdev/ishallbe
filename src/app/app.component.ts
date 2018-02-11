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
import { ProfileUpdatePage } from '../pages/profile-update/profile-update';
import { StatementCreatorPage } from '../pages/statement-creator/statement-creator';
import { GoalCreatorPage } from '../pages/goal-creator/goal-creator';
import { ProfilePage } from '../pages/profile/profile';
import { PostPage } from '../pages/post/post';
import { ExplorePage } from '../pages/explore/explore';
import { HomePage } from '../pages/home/home';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { PinCreatorPage } from '../pages/pin-creator/pin-creator';
import { PinsManagerPage } from '../pages/pins-manager/pins-manager';
import { PostsManagerPage } from '../pages/posts-manager/posts-manager';
import { UsersManagerPage } from '../pages/users-manager/users-manager';

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
      },
    ];

    this.editorMenuPages = [
      {
        title: 'Manage Pins',
        icon: 'ios-albums',
        component: PinsManagerPage
      },
      {
        title: 'Manage Posts',
        icon: 'ios-images',
        component: PostsManagerPage
      },
      {
        title: 'Manage Users',
        icon: 'ios-people',
        component: UsersManagerPage
      },
    ];

    this.providers = [
      { title: 'Firebase Provider', component: FirebaseProvider }
    ];

    this.pages = [
      { title: 'Signup Page', component: SignupPage },
      { title: 'Support Page', component: SupportPage },
      { title: 'Login Page', component: LoginPage },
      { title: 'About Page', component: AboutPage },
      { title: 'Support Page', component: SupportPage },
      { title: 'Update Email Page', component: EmailUpdatePage },
      { title: 'Update Password Page', component: PasswordUpdatePage },
      { title: 'Account Page', component: AccountPage },
      { title: 'Edit Profile Page', component: ProfileUpdatePage },
      { title: 'Create Statement Page', component: StatementCreatorPage },
      { title: 'Create Goal Page', component: GoalCreatorPage },
      { title: 'Profile Page', component: ProfilePage },
      { title: 'Post Page', component: PostPage },
      { title: 'Explore Page', component: ExplorePage },
      { title: 'Home Page', component: HomePage },
      { title: 'Tutorial Page', component: TutorialPage },
      { title: 'Create Pin Page', component: PinCreatorPage },
      { title: 'Pins Manager Page', component: PinsManagerPage },
      { title: 'Posts Manager Page', component: PostsManagerPage },
      { title: 'Users Manager Page', component: UsersManagerPage },
    ];

  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  platformReady() {
    this.platform.ready().then(() => {
      console.log("Platform ready");
      if (this.platform.is('cordova')) {
        this.deployUpdate().subscribe(() => { this.checkForUserSession(); });
      } else this.checkForUserSession();
      this.statusBar.styleDefault();
    });
  }

  listenToAuthEvents() {
    this.events.subscribe('login: editor', () => { this.editor = true });
    this.events.subscribe('logout', () => { this.editor = false });
  }

  checkForUserSession() {
    if (this.firebase.session) this.inSession();
    else {
      this.firebase.sessionExists().subscribe((session) => {
        if (session) this.inSession();
        else this.splashScreen.hide();
      });
    }
  }

  inSession() {
    this.session = true;
    this.nav.setRoot(HomePage);
    this.splashScreen.hide();
  }

  deployUpdate() {
    return Observable.create((observer) => {
      console.log("Deploying auto update");
      Pro.deploy.check().then((haveUpdate) => {
        if (haveUpdate) {
          console.log("UPDATE AVAILABLE");
          Pro.deploy.download().then(() => {
            Pro.deploy.extract().then(() => {
              console.log("REDIRECTING");
              Pro.deploy.redirect();
            });
          })
        } else {
          console.log("NO UPDATE AVAILABLE");
          observer.next();
        }
      });
    });
  }
}

