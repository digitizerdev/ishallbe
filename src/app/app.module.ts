import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Sean } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { Push } from '@ionic-native/push';
import { File } from '@ionic-native/file';
import { IonicStorageModule } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { CollaboratePage } from '../pages/collaborate/collaborate';
import { AboutPage } from '../pages/about/about';
import { CollabsPage } from '../pages/collabs/collabs';
import { TeamPage } from '../pages/team/team';
import { LoginPage } from '../pages/login/login';
import { ContactPage } from '../pages/contact/contact';
import { RegisterPage } from '../pages/register/register';
import { PartnersPage } from '../pages/partners/partners';
import { ExplorePage } from '../pages/explore/explore';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { AccountPage } from '../pages/account/account';
import { AccountPicPage } from '../pages/account-pic/account-pic';
import { AccountEmailPage } from '../pages/account-email/account-email';
import { AccountNamePage } from '../pages/account-name/account-name';
import { AccountPasswordPage } from '../pages/account-password/account-password';
import { SupportPage } from '../pages/support/support';
import { ContractsPage } from '../pages/contracts/contracts';
import { ProjectsPage } from '../pages/projects/projects';
import { TabsPage } from '../pages/tabs/tabs';

import { FirebaseProvider } from '../providers/firebase/firebase';

@NgModule({
  declarations: [
    Sean,
    HomePage,    
    CollaboratePage,    
    AboutPage,
    CollabsPage,
    TeamPage,    
    LoginPage,
    ContactPage,    
    RegisterPage,
    ForgotPasswordPage,
    PartnersPage,    
    ExplorePage,
    AccountPage,
    AccountPicPage,
    AccountEmailPage,    
    AccountNamePage,
    AccountPasswordPage, 
    SupportPage,   
    ContractsPage,
    ProjectsPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(Sean, {}, { links: [] }),
    IonicStorageModule.forRoot(),
    HttpModule   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Sean,
    HomePage,    
    CollaboratePage,    
    AboutPage,
    CollabsPage,
    TeamPage,    
    LoginPage,
    ContactPage,    
    RegisterPage,
    ForgotPasswordPage,
    PartnersPage,    
    ExplorePage,
    AccountPage,
    AccountPicPage,
    AccountEmailPage,    
    AccountNamePage,
    AccountPasswordPage,   
    SupportPage, 
    ContractsPage,
    ProjectsPage,
    TabsPage
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
    FirebaseProvider
  ]
})
export class AppModule { }
