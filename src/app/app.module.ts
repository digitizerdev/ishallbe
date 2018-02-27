import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Pro } from '@ionic/pro';
import { iShallBe } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
import { Push } from '@ionic-native/push';
import { File } from '@ionic-native/file';
import { DatePicker } from '@ionic-native/date-picker';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgCalendarModule } from 'ionic2-calendar';

import { environment } from '../environments/environment';

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

import { YoutubePipe } from '../pipes/youtube/youtube';

import { FirebaseProvider } from '../providers/firebase/firebase';

import { ComponentsModule } from '../components/components.module';

Pro.init('69d144ed', {
  appVersion: '1.2.0'
});

@NgModule({
  declarations: [
    iShallBe,
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
    NotificationsPage,
    ProfilePage,
    PostPage,
    ExplorePage,
    HomePage,
    TutorialPage,
    PinCreatorPage,
    ApiManagerPage,
    PostManagerPage,
    UserManagerPage,
    YoutubePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(iShallBe, {}, { links: [] }),
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
    SignupPage,
    PasswordResetPage,
    LoginPage,
    AboutPage,
    SupportPage,
    EmailUpdatePage,
    PasswordUpdatePage,
    AccountPage,
    ProfileUpdatePage,
    NotificationsPage,
    StatementCreatorPage,
    GoalCreatorPage,
    ProfilePage,
    PostPage,
    ExplorePage,
    HomePage,
    TutorialPage,
    PinCreatorPage,
    ApiManagerPage,
    PostManagerPage,
    UserManagerPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    Push,
    File,
    DatePicker,
    Facebook,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FirebaseProvider
   ]
})
export class AppModule { }
