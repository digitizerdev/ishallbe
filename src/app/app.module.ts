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

import { ComponentsModule } from '../components/components.module';

import { FirebaseProvider } from '../providers/firebase/firebase';
import { StorageProvider } from '../providers/storage/storage';

@NgModule({
  declarations: [
    iShallBe,
    HomePage,
    AboutPage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    AccountPage,
    SupportPage,
    ProfilePage,
    ManagePage,
    MediaPage,
    ContentPage,
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
    HomePage,
    AboutPage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    AccountPage,
    SupportPage,
    ProfilePage,
    ManagePage,
    MediaPage,
    ContentPage,
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
    StorageProvider
  ]
})
export class AppModule { }
