import { NgModule, Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Rx';

import { LoginPage } from '../pages/login/login';
import { PasswordResetPage } from '../pages/password-reset/password-reset';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileManagerPage } from '../pages/profile-manager/profile-manager';
import { ProfilePhotoPage } from '../pages/profile-photo/profile-photo';
import { StatementPage } from '../pages/statement/statement';
import { AccountPage } from '../pages/account/account';
import { AccountEmailPage } from '../pages/account-email/account-email';
import { AccountPasswordPage } from '../pages/account-password/account-password';
import { SupportPage } from '../pages/support/support';
import { HomePage } from '../pages/home/home';
import { PinPage } from '../pages/pin/pin';
import { PostPage } from '../pages/post/post';
import { AboutPage } from '../pages/about/about';
import { UsersManagerPage } from '../pages/users-manager/users-manager';
import { UserManagerPage } from '../pages/user-manager/user-manager';
import { PostsManagerPage } from '../pages/posts-manager/posts-manager';
import { PostManagerPage } from '../pages/post-manager/post-manager';
import { PinsManagerPage } from '../pages/pins-manager/pins-manager';
import { PinManagerPage } from '../pages/pin-manager/pin-manager';

import { ComponentsModule } from '../components/components.module';
import { HeaderComponent } from '../components/header/header';
import { TermsOfServiceComponent } from '../components/terms-of-service/terms-of-service';
import { LoginFormComponent } from '../components/login-form/login-form';
import { ResetPasswordFormComponent } from '../components/reset-password-form/reset-password-form';
import { RegisterFormComponent } from '../components/register-form/register-form';
import { AccountEmailFormComponent } from '../components/account-email-form/account-email-form';
import { AccountPasswordFormComponent } from '../components/account-password-form/account-password-form';
import { SupportFormComponent } from '../components/support-form/support-form';
import { LoginFacebookComponent } from '../components/login-facebook/login-facebook';

import { FirebaseProvider } from '../providers/firebase/firebase';
import { SessionProvider } from '../providers/session/session';
import { MediaProvider } from '../providers/media/media';

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
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public firebase: FirebaseProvider,
    public session: SessionProvider,
  ) {
    this.rootPage = LoginPage;
    platform.ready();

    this.pages = [
      { title: 'Login Page', component: LoginPage },
      { title: 'Password Reset Page', component: PasswordResetPage },
      { title: 'Register Page', component: RegisterPage },
      { title: 'Profile Page', component: ProfilePage },
      { title: 'Profile Manager Page', component: ProfileManagerPage },
      { title: 'Profile Photo Page', component: ProfilePhotoPage },
      { title: 'Statement Page', component: StatementPage },
      { title: 'Account Page', component: AccountPage },
      { title: 'Account Email Page', component: AccountEmailPage },
      { title: 'Account Password Page', component: AccountPasswordPage },
      { title: 'Support Page', component: SupportPage },
      { title: 'Home Page', component: HomePage },
      { title: 'Pin Page', component: PinPage },
      { title: 'Post Page', component: PostPage },
      { title: 'About Page', component: AboutPage },
      { title: 'Users Manager Page', component: UsersManagerPage },
      { title: 'User Manager Page', component: UserManagerPage },
      { title: 'Posts Manager Page', component: PostsManagerPage },
      { title: 'Post Manager Page', component: PostManagerPage },
      { title: 'Pins Manager Page', component: PinsManagerPage },
      { title: 'Pin Manager Page', component: PinManagerPage }
    ];

    this.providers = [
      { title: 'Firebase Provider', component: FirebaseProvider },
      { title: 'Session Provider', component: SessionProvider },
      { title: 'Media Provider', component: MediaProvider }
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
        title: 'Profile',
        icon: 'ios-person',
        component: ProfilePage
      },
      {
        title: 'Account',
        icon: 'ios-contact',
        component: AccountPage
      },
      {
        title: 'Support',
        icon: 'ios-mail',
        component: SupportPage
      },
    ]

    this.components = [
      { title: 'Header Component', component: HeaderComponent },      
      { title: 'Login Form', component: LoginFormComponent },
      { title: 'Reset Password Form Component', component: ResetPasswordFormComponent },
      { title: 'Register Form Component', component: RegisterFormComponent },
      { title: 'Terms of Service Component', component: TermsOfServiceComponent },
      { title: 'Account Email Form Component', component: AccountEmailFormComponent },
      { title: 'Account Password Form Component', component: AccountPasswordFormComponent },
      { title: 'Support Form Component', component: SupportFormComponent },
      { title: 'Login Facebook Component', component: LoginFacebookComponent },      
    ]
  }

  platformReady() {
    this.platform.ready().then(() => {
      console.log("Platform ready");
      this.wakeUp();
      this.splashScreen.hide();
    });
  }

  wakeUp() {
    console.log("Waking up")
    this.session.loggedIn().subscribe((user)=>{
      console.log("Got user");
      console.log(user);
      if (user) {
        this.sessionFound();
      } else {
        console.log("Didn't get user");
      }
    })
  }

  sessionFound() {
    this.nav.setRoot(HomePage);
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

}

