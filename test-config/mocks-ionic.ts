import { NavController, NavParams, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';
import { Push } from '@ionic-native/push';
import { File } from '@ionic-native/file';
import { DatePicker } from '@ionic-native/date-picker';
import { EmailComposer } from '@ionic-native/email-composer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Observable } from 'rxjs/Observable';

import { HomePage } from '../src/pages/home/home';

import { FirebaseProvider } from '../src/providers/firebase/firebase';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

export class PlatformMock {
  public ready(): Promise<string> {
    return new Promise((resolve) => {
      resolve('READY');
    });
  }

  public getQueryParam() {
    return true;
  }

  public registerBackButtonAction(fn: Function, priority?: number): Function {
    return (() => true);
  }

  public hasFocus(ele: HTMLElement): boolean {
    return true;
  }

  public doc(): HTMLDocument {
    return document;
  }

  public is(): boolean {
    return true;
  }

  public getElementComputedStyle(container: any): any {
    return {
      paddingLeft: '10',
      paddingTop: '10',
      paddingRight: '10',
      paddingBottom: '10',
    };
  }

  public onResize(callback: any) {
    return callback;
  }

  public registerListener(ele: any, eventName: string, callback: any): Function {
    return (() => true);
  }

  public win(): Window {
    return window;
  }

  public raf(callback: any): number {
    return 1;
  }

  public timeout(callback: any, timer: number): any {
    return setTimeout(callback, timer);
  }

  public cancelTimeout(id: any) {
    // do nothing
  }

  public getActiveElement(): any {
    return document['activeElement'];
  }
}

export class DeepLinkerMock {

}

export class StatusBarMock extends StatusBar {
  styleDefault() {
    return;
  }
}

export class SplashScreenMock extends SplashScreen {
  hide() {
    return;
  }
}

export class FacebookMock extends Facebook {
  hide() {
    return;
  }
}

export class FileMock extends File {
  hide() {
    return;
  }
}

export class PushMock extends Push {
  hide() {
    return;
  }
}

export class NavMock {

  public pop(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }

  public registerChildNav(nav: any): void {
    return;
  }

  public unregisterChildNav(nav: any) {
  }
}

export class NavParamsMock {
  public get(name: string): any {
    return new Promise(function (resolve: Function): void {
      resolve('testNavParamReturnValue');
    });
  }
}

export class ActionSheetControllerMock extends ActionSheetController {
  _getPortal(): any { return {} };

  public present(): any {
    return new Promise(function (resolve: Function): void {
      resolve('testActionSheetControllerValue');
    });
  }
}


export class AlertControllerMock extends AlertController {
  public _getPortal(): any {
    return new Promise(function (resolve: Function): void {
      resolve('testActionSheetControllerValue');
    });
  }
  public present(name: string): any {
    return new Promise(function (resolve: Function): void {
      resolve('testActionSheetControllerValue');
    });
  }
}

class AlertMock {
  present() { };
}

export class LoadingControllerMock {
  _getPortal(): any { return {} };
  create(options?: any) {
    return new LoadingMock()
  }; 
}

class LoadingMock {
  present() { };
  dismiss() { };
  dismissAll() { };
}

export class EventsMock {
  _getPortal(): any { return {} };
  
  public publish(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }
}

export class FirebaseProviderMock extends FirebaseProvider {
  styleDefault() {
    return;
  }

  checkForSession() {
    return;
  }
}

export class CameraMock extends Camera {

  public getPicture(cameraOptions): any {
    return new Promise(function (resolve: Function): void {
      resolve('image');
    });
  }
}

export class EmailComposerMock extends EmailComposer {
  _getPortal(): any { return {} };

  public open(email): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }
}

export class InAppBrowserMock extends InAppBrowser {
  _getPortal(): any { return {} };

  public create(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }
}

export class DatePickerMock extends DatePicker {
  _getPortal(): any { return {} };

  public show(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }
}
