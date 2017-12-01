import { NgModule, Component, ViewChild } from '@angular/core';
import { Events, Nav, MenuController, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';;
import { AccountPage } from '../pages/account/account';
import { SupportPage } from '../pages/support/support';
import { MediaPage } from '../pages/media/media';
import { ProfilePage } from '../pages/profile/profile';
import { ManagePage } from '../pages/manage/manage';
import { ContentPage } from '../pages/content/content';

import { PinsComponent } from '../components/pins/pins';
import { PinComponent } from '../components/pin/pin';
import { PostsComponent } from '../components/posts/posts';
import { PostComponent } from '../components/post/post';
import { UsersComponent } from '../components/users/users';
import { CommentsComponent } from '../components/comments/comments';
import { MediaComponent } from '../components/media/media';
import { FacebookComponent } from '../components/facebook/facebook';

import { FirebaseProvider } from '../providers/firebase/firebase';
import { StorageProvider } from '../providers/storage/storage';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
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
  menuPages: Array<{ title: string, component: any }>;
  
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public user: FirebaseProvider,
    public alertCtrl: AlertController,
    public menu: MenuController,
    public events: Events,
    public push: Push
  ) {
    this.rootPage = LoginPage;
    platform.ready();

    this.pages = [
      { title: 'Home Page', component: HomePage },
      { title: 'About Page', component: AboutPage },
      { title: 'Login Page', component: LoginPage },
      { title: 'Register Page', component: RegisterPage },
      { title: 'Forgot Password Page', component: ForgotPasswordPage },
      { title: 'Account Page', component: AccountPage },
      { title: 'Support Page', component: SupportPage },
      { title: 'Media Page', component: MediaPage },
      { title: 'Manage Page', component: ManagePage },
      { title: 'Content Page', component: ContentPage }
    ];

    this.providers = [
      { title: 'Firebase Provider', component: FirebaseProvider },
      { title: 'Storage Provider', component: StorageProvider }
    ]

    this.components = [
      { title: 'Comments Component', component: CommentsComponent },
      { title: 'Pins Component', component: PinsComponent },
      { title: 'Pin Component', component: PinComponent },
      { title: 'Posts Component', component: PostsComponent },
      { title: 'Post Component', component: PostComponent },
      { title: 'Facebook Component', component: FacebookComponent },
      { title: 'Media Component', component: MediaComponent },
      { title: 'Users Component', component: UsersComponent }
    ]

    this.pages = [
      { title: 'Login Page', component: LoginPage },
      { title: 'Register Page', component: RegisterPage },
      { title: 'Forgot Password Page', component: ForgotPasswordPage },
      { title: 'Home Page', component: HomePage },
      { title: 'About Page', component: AboutPage },
      { title: 'Profile Page', component: ProfilePage },
      { title: 'Account Page', component: AccountPage },      
      { title: 'Support Page', component: SupportPage },
      { title: 'Content Page', component: ContentPage },      
      { title: 'Media Page', component: MediaPage },
      { title: 'Manage Page', component: ManagePage },
    ];

    this.menuPages = [
      { title: 'Home Page', component: HomePage },
      { title: 'About Page', component: AboutPage },
      { title: 'Profile Page', component: ProfilePage },
      { title: 'Account Page', component: AccountPage },      
      { title: 'Support Page', component: SupportPage },
    ]

  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  platformReady() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.initPushNotification();
    });
  }

  initPushNotification() {
    this.push.hasPermission()
      .then((res: any) => {
        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }
      });

    const options: PushOptions = {
      android: {},
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
    };

    const pushObject: PushObject = this.push.init(options);
  }


}

