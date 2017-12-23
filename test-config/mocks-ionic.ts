import { FirebaseProvider } from '../src/providers/firebase/firebase';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';
import { Push } from '@ionic-native/push';
import { File } from '@ionic-native/file';
import { IonicStorageModule, } from '@ionic/storage';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

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


export class CameraMock extends Camera {

  public open(email): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }
}


export class EmailComposerMock extends EmailComposer {

  public open(email): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }
}

export class PushMock extends Push {
  hide() {
    return;
  }
}

export class StorageMock extends IonicStorageModule {

  public ready(): any {
    return new Promise(function (resolve: Function): void {
      resolve(true);
    });
  }

  public get(name: string) {

    if (name = 'session') {
      return new Promise(function (resolve: Function): void {
        resolve(true);
      });
    }

    if (name = 'failSession') {
      return new Promise(function (resolve: Function): void {
        resolve(true);
      });
    }

  }

  public set(name: string, value: any): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
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

export class DeepLinkerMock {

}

export class AlertControllerMock {
  _getPortal(): any { return {} };

  create(options?: any) {
    return new AlertMock()
  };
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

export class FirebaseProviderMock extends FirebaseProvider {
  styleDefault() {
    return;
  }

  public login(loginForm): any {
    return new Promise(function (resolve: Function): void {
      let token = {
        uid: 'testUID'
      }
      resolve(token);
    });
  }
}

export class AngularFireDatabaseMock extends AngularFireDatabaseModule {
  public profile(): any {
    return {
      update(object) {
        return;
      }
    }
  }

  object(): Observable<any> {
    return Observable.of('you object');
  } 

}

export class AngularFireAuthMock extends AngularFireAuthModule {

  public auth(): any {
    return {
      signInWithEmailAndPassword(email, password) {
        let token = {
          uid: 'testUID'
        }
        return token;
      },

      currentUser(): any {
        return {
          updateEmail(email): any {
            return;
          }
        }
      }
    }
  }
}

export class FirebaseAppMock extends AngularFireModule {
  hide() {
    return;
  }
}
