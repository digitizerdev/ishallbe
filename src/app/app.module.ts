import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Pro } from '@ionic/pro';
import { NgCalendarModule } from 'ionic2-calendar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Media } from '@ionic-native/media';
import { DatePicker } from '@ionic-native/date-picker';
import { FCM } from '@ionic-native/fcm';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { iShallBe } from './app.component';

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
import { GoalCreatorPage } from '../pages/goal-creator/goal-creator';
import { StatementCreatorPage } from '../pages/statement-creator/statement-creator';
import { ChatsPage } from '../pages/chats/chats';
import { ChatPage } from '../pages/chat/chat';
import { ProfilePage } from '../pages/profile/profile';
import { PinCreatorPage } from '../pages/pin-creator/pin-creator';
import { PostManagerPage } from '../pages/post-manager/post-manager';
import { UserManagerPage } from '../pages/user-manager/user-manager';
import { ApiManagerPage } from '../pages/api-manager/api-manager';
import { PostPage } from '../pages/post/post';
import { IshallbetvPage } from '../pages/ishallbetv/ishallbetv';
import { NotificationsPage } from '../pages/notifications/notifications';
import { HomePage } from '../pages/home/home';

import { TutorialPage } from '../pages/tutorial/tutorial';

import { YoutubePipe } from '../pipes/youtube/youtube';

import { FirebaseProvider } from '../providers/firebase/firebase';

import { ComponentsModule } from '../components/components.module';

Pro.init('69d144ed', {
  appVersion: '1.3.0'
});

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
    GoalCreatorPage,
    StatementCreatorPage,
    ChatsPage,
    ChatPage,
    ProfilePage,
    PostPage,
    IshallbetvPage,
    NotificationsPage,
    HomePage,
    PinCreatorPage,
    PostManagerPage,
    UserManagerPage,
    ApiManagerPage,
    NotificationsPage,
    TutorialPage,
    YoutubePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(iShallBe, {}, { links: [] }),
    ComponentsModule,
    NgCalendarModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule,
    AngularFireAuthModule,
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
    GoalCreatorPage,
    StatementCreatorPage,
    ChatsPage,
    ChatPage,
    ProfilePage,
    PostPage,
    IshallbetvPage,
    NotificationsPage,
    HomePage,
    PinCreatorPage,
    PostManagerPage,
    UserManagerPage,
    ApiManagerPage,
    NotificationsPage,
    TutorialPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    StatusBar,
    SplashScreen,
    Facebook,
    Camera,
    EmailComposer,
    InAppBrowser,
    File,
    FileTransfer,
    Media,
    DatePicker,
    FCM,
    FirebaseProvider
   ]
})
export class AppModule { }
