import { NgModule, Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Observable } from 'rxjs/Rx';

import { StartupPage } from '../pages/startup/startup';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PasswordResetPage } from '../pages/password-reset/password-reset';
import { AccountEmailPage } from '../pages/account-email/account-email';
import { AccountPasswordPage } from '../pages/account-password/account-password';
import { SupportPage } from '../pages/support/support';
import { AccountPage } from '../pages/account/account';
import { AboutPage } from '../pages/about/about';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ProfilePage } from '../pages/profile/profile';
import { CreateStatementPage } from '../pages/create-statement/create-statement';
import { PostPage } from '../pages/post/post';
import { PinPage } from '../pages/pin/pin';
import { HomePage } from '../pages/home/home';
import { CreatePinPage } from '../pages/create-pin/create-pin';
import { PinsManagerPage } from '../pages/pins-manager/pins-manager';
import { PostsManagerPage } from '../pages/posts-manager/posts-manager';
import { UsersManagerPage } from '../pages/users-manager/users-manager';
import { CreateGoalPage } from '../pages/create-goal/create-goal';
import { ExplorePage } from '../pages/explore/explore';
import { GoalsPage } from '../pages/goals/goals';

import { FirebaseProvider } from '../providers/firebase/firebase';

export interface PageInterface {
}

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
  editor = false;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private alertCtrl: AlertController,
    private events: Events,
    private firebase: FirebaseProvider,
  ) {
    this.rootPage = StartupPage;
    platform.ready();

    this.exploreMenuPages = [
      {
        title: 'Home',
        icon: 'ios-home',
        component: HomePage
      },
      {
        title: 'About',
        icon: 'ios-information-circle',
        component: AboutPage
      },
      {
        title: 'Explore',
        icon: 'globe',
        component: ExplorePage
      }
    ];

    this.engageMenuPages = [
      {
        title: 'Create Goal',
        icon: 'ios-microphone',
        component: CreateGoalPage
      },
      {
        title: 'Create Statement',
        icon: 'ios-camera',
        component: CreateStatementPage
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
      { title: 'Startup Page', component: StartupPage },
      { title: 'Login Page', component: LoginPage },
      { title: 'Register Page', component: RegisterPage },
      { title: 'Password Reset Page', component: PasswordResetPage },
      { title: 'Support Page', component: SupportPage },
      { title: 'Account Email Page', component: AccountEmailPage },
      { title: 'Account Password Page', component: AccountPasswordPage },
      { title: 'Account Page', component: AccountPage },
      { title: 'About Page', component: AboutPage },
      { title: 'Edit Profile Page', component: EditProfilePage },
      { title: 'Profile Page', component: ProfilePage },
      { title: 'Create Statement Page', component: CreateStatementPage },
      { title: 'Post Page', component: PostPage },
      { title: 'Pin Page', component: PinPage },
      { title: 'Home Page', component: HomePage },
      { title: 'Create Pin Page', component: CreatePinPage },
      { title: 'Users Manager Page', component: UsersManagerPage },
      { title: 'Posts Manager Page', component: PostsManagerPage },
      { title: 'Pins Manager Page', component: PinsManagerPage },
      { title: 'Create Goal Page', component: CreateGoalPage },
      { title: 'Explore Page', component: ExplorePage },
      { title: 'Goals Page', component: GoalsPage }
    ];
    
  }

  platformReady() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }
  
  openPage(page) {
    this.nav.setRoot(page.component);
  }
  
  listenToEditorLogin() {
    this.events.subscribe('login: editor', () => { this.editor = true });
  }
}

