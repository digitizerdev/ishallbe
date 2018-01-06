import { NgModule, Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
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
import { PhotoPage } from '../pages/photo/photo';
import { ProfilePage } from '../pages/profile/profile';
import { CreateStatementPage } from '../pages/create-statement/create-statement';
import { PostPage } from '../pages/post/post';
import { PinPage } from '../pages/pin/pin';
import { HomePage } from '../pages/home/home';
import { CreatePinPage } from '../pages/create-pin/create-pin';
import { PinsManagerPage } from '../pages/pins-manager/pins-manager';
import { PostsManagerPage } from '../pages/posts-manager/posts-manager';
import { UsersManagerPage } from '../pages/users-manager/users-manager';
import { ComponentsModule } from '../components/components.module';
import { HeaderComponent } from '../components/header/header';
import { TermsOfServiceComponent } from '../components/terms-of-service/terms-of-service';
import { LoginFacebookComponent } from '../components/login-facebook/login-facebook';

import { FirebaseProvider } from '../providers/firebase/firebase';

export interface PageInterface {
}

@Component({
  templateUrl: 'app.component.html',
})
export class iShallBe {

  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  pages: Array<{ title: string, component: any }>;
  providers: Array<{ title: string, component: any }>;
  components: Array<{ title: string, component: any }>;
  menuPages: Array<{ title: string, icon: string, component: any }>;
  managerPages: Array<{ title: string, icon: string, component: any }>;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private alertCtrl: AlertController,
    private firebase: FirebaseProvider,
    private storage: Storage,
    private push: Push
  ) {
    this.rootPage = StartupPage;
    platform.ready();

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
      { title: 'Photo Page', component: PhotoPage },
      { title: 'Profile Page', component: ProfilePage },
      { title: 'Create Statement Page', component: CreateStatementPage },
      { title: 'Post Page', component: PostPage },
      { title: 'Pin Page', component: PinPage },
      { title: 'Home Page', component: HomePage },
      { title: 'Create Pin Page', component: CreatePinPage },
      { title: 'Users Manager Page', component: UsersManagerPage },
      { title: 'Posts Manager Page', component: PostsManagerPage },
      { title: 'Pins Manager Page', component: PinsManagerPage }
    ];

    this.providers = [
      { title: 'Firebase Provider', component: FirebaseProvider },
    ]

    this.menuPages = [
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
        title: 'Create Statement',
        icon: 'ios-camera',
        component: CreateStatementPage
      },
      {
        title: 'Profile',
        icon: 'ios-person',
        component: ProfilePage
      },
      {
        title: 'Account',
        icon: 'ios-contact',
        component: AccountPage
      },

    ]

    this.components = [
      { title: 'Header Component', component: HeaderComponent },
      { title: 'Terms of Service Component', component: TermsOfServiceComponent },
      { title: 'Login Facebook Component', component: LoginFacebookComponent },
    ]
  }

  platformReady() {
    this.platform.ready().then(() => {
      console.log("Platform ready");
      this.splashScreen.hide();
      this.initPushNotification();
    });
  }

  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.warn("Push notifications not initialized. Cordova is not available - Run in physical device");
      return;
    }

    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });

    // to init
    const options: PushOptions = {
      android: {},
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false',

      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }


  openPage(page) {
    this.nav.setRoot(page.component);
  }

}

