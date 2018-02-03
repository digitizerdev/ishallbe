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

import { ComponentsModule } from '../components/components.module';
import { YoutubePipe } from '../pipes/youtube/youtube';
import { FirebaseProvider } from '../providers/firebase/firebase';

@NgModule({
  declarations: [
    iShallBe,
    StartupPage,
    LoginPage,
    RegisterPage,    
    PasswordResetPage,  
    AccountEmailPage,
    AccountPasswordPage,
    SupportPage,
    AccountPage,
    AboutPage,
    EditProfilePage,
    ProfilePage,
    CreateStatementPage,
    PostPage,
    PinPage,
    HomePage,
    CreatePinPage,
    PinsManagerPage,
    PostsManagerPage,
    UsersManagerPage,
    CreateGoalPage,
    ExplorePage,
    GoalsPage,
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
    LoginPage,
    RegisterPage,    
    PasswordResetPage,  
    AccountEmailPage,
    AccountPasswordPage,
    SupportPage,
    AccountPage,
    AboutPage,
    EditProfilePage,
    ProfilePage,
    CreateStatementPage,
    PostPage,
    PinPage,
    HomePage,
    CreatePinPage,
    PinsManagerPage,
    PostsManagerPage,
    UsersManagerPage,
    CreateGoalPage,
    ExplorePage,
    GoalsPage,
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
