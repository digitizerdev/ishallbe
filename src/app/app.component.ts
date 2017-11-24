import {Component, ViewChild} from '@angular/core';
import {Events, Nav, MenuController, Platform, AlertController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

// start import pages
import {HomePage} from '../pages/home/home';
import {CollaboratePage} from '../pages/collaborate/collaborate';
import {AboutPage} from '../pages/about/about';
import {PortfolioPage} from '../pages/portfolio/portfolio';
import {TeamPage} from '../pages/team/team';
import {LoginPage} from '../pages/login/login';
import {ContactPage} from '../pages/contact/contact';
import {RegisterPage} from '../pages/register/register';
import {PartnersPage} from '../pages/partners/partners';
import {ExplorePage} from '../pages/explore/explore';
import {ForgotPasswordPage} from '../pages/forgot-password/forgot-password';
import {AccountPage} from '../pages/account/account';
import {AccountPicPage} from '../pages/account-pic/account-pic';
import {AccountEmailPage} from '../pages/account-email/account-email';
import {AccountNamePage} from '../pages/account-name/account-name';
import {AccountPasswordPage} from '../pages/account-password/account-password';
import {SupportPage} from '../pages/support/support';
import {ContractsPage} from '../pages/contracts/contracts';
import {ProjectsPage} from '../pages/projects/projects';
import {TabsPage} from '../pages/tabs/tabs';
// end import pages

// start plugins
import { Push, PushObject, PushOptions } from '@ionic-native/push';// end plugins

//start providers
import {UserProvider} from '../providers/user/user';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.component.html',
})
export class Sean {

  @ViewChild(Nav) nav: Nav;

  appPages: PageInterface[] = [
    { title: 'Home', name: 'TabsPage', component: TabsPage, tabComponent: HomePage, icon: 'ios-home-outline' },
    { title: 'Collaborate', name: 'TabsPage', component: TabsPage, tabComponent: CollaboratePage, index: 1, icon: 'ios-contract-outline' },
    { title: 'About', name: 'TabsPage', component: TabsPage, tabComponent: AboutPage, index: 2, icon: 'ios-information-circle-outline' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Account', name: 'AccountPage', component: AccountPage, icon: 'ios-person' },
    { title: 'Contact', name: 'ContactPage', component: ContactPage, icon: 'ios-help-outline' },
    { title: 'Logout', name: 'TabsPage', component: TabsPage, icon: 'ios-log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'ios-log-in' },
    { title: 'Contact', name: 'ContactPage', component: ContactPage, icon: 'ios-help-circle-outline' },
    { title: 'Register', name: 'RegisterPage', component: RegisterPage, icon: 'ios-contact' }
  ];
  rootPage: any;
  pages: Array<{ title: string, component: any }>;
  
  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public user: UserProvider,
    public alertCtrl: AlertController,
    public menu: MenuController,
    public events: Events,
    public push: Push
  ) {
    this.rootPage = TabsPage;
    platform.ready();

    this.listenToLoginEvents();

    this.pages = [
      { title: 'Home Page', component: HomePage },
      { title: 'Collaborate Page', component: ContactPage },
      { title: 'About Page', component: AboutPage },
      { title: 'Portfolio Page', component: PortfolioPage },
      { title: 'Team Page', component: TeamPage },
      { title: 'Login Page', component: LoginPage },
      { title: 'Contact Page', component: ContactPage },
      { title: 'Register Page', component: RegisterPage },
      { title: 'Forgot Password Page', component: ForgotPasswordPage },
      { title: 'Partners Page', component: PartnersPage },
      { title: 'Explore Page', component: ExplorePage },
      { title: 'Account Page', component: AccountPage },
      { title: 'Account Pic Page', component: AccountPicPage },
      { title: 'Account Email Page', component: AccountEmailPage },
      { title: 'Account Name', component: AccountNamePage },
      { title: 'Account Password', component: AccountPasswordPage },
      { title: 'Support Page', component: SupportPage },
      { title: 'Contracts Page', component: ContractsPage },
      { title: 'Projects Page', component: ProjectsPage },
      { title: 'TabsPage Page', component: TabsPage }
    ];
  }

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });
    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        //this.user.logout();
      }, 1000);
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.initPushNotification();   
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

  initPushNotification(){
  // to check if we have permission
  this.push.hasPermission()
  .then((res: any) => {

    if (res.isEnabled) {
      console.log('We have permission to send push notifications');
    } else {
      console.log('We do not have permission to send push notifications');
    }

  });

  // to initialize push notifications

  const options: PushOptions = {
  android: {},
  ios: {
      alert: 'true',
      badge: true,
      sound: 'false'
  },
  };

  const pushObject: PushObject = this.push.init(options);
  } 

  
}

