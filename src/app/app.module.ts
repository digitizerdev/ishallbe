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
import { YoutubePipe } from '../pipes/youtube/youtube';
import { FirebaseProvider } from '../providers/firebase/firebase';

import * as firebase from 'firebase/app';

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
    PhotoPage,
    ProfilePage,
    CreateStatementPage,
    PostPage,
    PinPage,
    HomePage,
    CreatePinPage,
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
    AngularFireAuthModule,
    AngularFireDatabaseModule
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
    PhotoPage,
    ProfilePage,
    CreateStatementPage,
    PostPage,
    PinPage,
    HomePage,
    CreatePinPage,
    PinsManagerPage,
    PostsManagerPage,
    UsersManagerPage
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
