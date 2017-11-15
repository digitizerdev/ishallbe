import {Component, ViewChild} from '@angular/core';
import {Events, Nav, MenuController, Platform, AlertController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

// start import pages
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {HomePage} from '../pages/home/home';
import {AboutPage} from '../pages/about/about';
import {PortfolioPage} from '../pages/portfolio/portfolio';
import {ServicesPage} from '../pages/services/services';
import {ContactPage} from '../pages/contact/contact';
import {AccountPage} from '../pages/account/account';
import {ClientPage} from '../pages/client/client';
import {CollaboratorPage} from '../pages/collaborator/collaborator';
import {PartnerPage} from '../pages/partner/partner';
import {TabsPage} from '../pages/tabs/tabs';
import {TutorialPage} from '../pages/tutorial/tutorial'
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
    { title: 'Home', name: 'TabsPage', component: TabsPage, tabComponent: HomePage, icon: 'home' },
    { title: 'Portfolio', name: 'TabsPage', component: TabsPage, tabComponent: PortfolioPage, index: 1, icon: 'albums' },
    { title: 'About', name: 'TabsPage', component: TabsPage, tabComponent: AboutPage, index: 2, icon: 'information-circle' }
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Account', name: 'AccountPage', component: AccountPage, icon: 'person' },
    { title: 'Contact', name: 'ContactPage', component: ContactPage, icon: 'help' },
    { title: 'Logout', name: 'TabsPage', component: TabsPage, icon: 'log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [
    { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
    { title: 'Contact', name: 'ContactPage', component: ContactPage, icon: 'help' },
    { title: 'Register', name: 'RegisterPage', component: RegisterPage, icon: 'person-add' }
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
      { title: 'Page One', component: LoginPage },
      { title: 'Page Two', component: ContactPage }
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

  openTutorial() {
    this.nav.setRoot(TutorialPage);
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

