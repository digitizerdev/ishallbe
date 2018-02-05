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
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';import { environment } from '../environments/environment';
import { NgCalendarModule } from 'ionic2-calendar';

import { StartupPage } from '../pages/startup/startup';
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

import { ComponentsModule } from '../components/components.module';
import { YoutubePipe } from '../pipes/youtube/youtube';
import { FirebaseProvider } from '../providers/firebase/firebase';

@NgModule({
  declarations: [
    iShallBe,
    StartupPage,
    SignupPage,
    PasswordResetPage,
    LoginPage,
    AboutPage,
    SupportPage,
    EmailUpdatePage,
    PasswordUpdatePage,
    AccountPage,
    ProfileUpdatePage,
    StatementCreatorPage,
    GoalCreatorPage,
    ProfilePage,
    PostPage,
    ExplorePage,
    HomePage,
    TutorialPage,
    PinCreatorPage,
    PinsManagerPage,
    PostsManagerPage,
    UsersManagerPage,
    YoutubePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(iShallBe, {}, { links: [] }),
    IonicStorageModule.forRoot(),
    HttpModule,
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgCalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    iShallBe,
    StartupPage,
    SignupPage,
    PasswordResetPage,
    LoginPage,
    AboutPage,
    SupportPage,
    EmailUpdatePage,
    PasswordUpdatePage,
    AccountPage,
    ProfileUpdatePage,
    StatementCreatorPage,
    GoalCreatorPage,
    ProfilePage,
    PostPage,
    ExplorePage,
    HomePage,
    TutorialPage,
    PinCreatorPage,
    PinsManagerPage,
    PostsManagerPage,
    UsersManagerPage,
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
