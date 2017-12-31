import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { iShallBe } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
import { Push } from '@ionic-native/push';
import { File } from '@ionic-native/file';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

import { StartupPage } from '../pages/startup/startup';
import { LoginPage } from '../pages/login/login';
import { PasswordResetPage } from '../pages/password-reset/password-reset';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { PhotoPage } from '../pages/photo/photo';
import { StatementsPage } from '../pages/statements/statements';
import { CreateStatementPage } from '../pages/create-statement/create-statement';
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
import { CreatePinPage } from '../pages/create-pin/create-pin';
import { UserPage } from '../pages/user/user';

import { ComponentsModule } from '../components/components.module';

import { FirebaseProvider } from '../providers/firebase/firebase';

import * as firebase from 'firebase/app';

@NgModule({
  declarations: [
    iShallBe,
    StartupPage,
    LoginPage,
    PasswordResetPage,  
    RegisterPage,
    ProfilePage,
    PhotoPage,
    EditProfilePage,
    StatementsPage,  
    CreateStatementPage,
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
    PostManagerPage,
    CreatePinPage,
    UserPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(iShallBe, {}, { links: [] }),
    IonicStorageModule.forRoot(),
    HttpModule,
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  iShallBe,
    StartupPage,
    LoginPage,
    PasswordResetPage,  
    RegisterPage,
    ProfilePage,
    PhotoPage,
    EditProfilePage,
    StatementsPage,
    CreateStatementPage,  
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
    PostManagerPage,
    CreatePinPage,
    UserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    Push,
    File,
    Facebook,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FirebaseProvider
   ]
})
export class AppModule { }
