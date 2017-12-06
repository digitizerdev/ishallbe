import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { iShallBe } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { Push } from '@ionic-native/push';
import { File } from '@ionic-native/file';
import { IonicStorageModule } from '@ionic/storage';

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

import { FirebaseProvider } from '../providers/firebase/firebase';
import { SessionProvider } from '../providers/session/session';

import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    iShallBe,
    LoginPage,
    PasswordResetPage,  
    RegisterPage,
    ProfilePage,
    ProfilePhotoPage,
    ProfileManagerPage,
    StatementPage,  
    AccountPage,
    AccountEmailPage,
    AccountPasswordPage,
    SupportPage,
    HomePage,
    PinPage,
    PostPage,
    AboutPage,
    UsersManagerPage,
    UserManagerPage,
    PinsManagerPage,
    PinManagerPage,
    PostsManagerPage,
    PostManagerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(iShallBe, {}, { links: [] }),
    IonicStorageModule.forRoot(),
    HttpModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    iShallBe,
    LoginPage,
    PasswordResetPage,  
    RegisterPage,
    ProfilePage,
    ProfilePhotoPage,
    ProfileManagerPage,
    StatementPage,  
    AccountPage,
    AccountEmailPage,
    AccountPasswordPage,
    SupportPage,
    HomePage,
    PinPage,
    PostPage,
    AboutPage,
    UsersManagerPage,
    UserManagerPage,
    PinsManagerPage,
    PinManagerPage,
    PostsManagerPage,
    PostManagerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    File,
    Facebook,
    Camera,
    MediaCapture,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FirebaseProvider,
    SessionProvider
  ]
})
export class AppModule { }
