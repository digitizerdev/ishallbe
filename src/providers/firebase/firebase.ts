import { Injectable } from '@angular/core';
import {AngularFireDatabase,  AngularFireDatabaseModule } from 'angularfire2/database';

import * as Firebase from 'firebase';
let firebase: any = Firebase;

import { Observable } from 'rxjs/Observable';
@Injectable()
export class FirebaseProvider {
    storage: any;
    
    constructor(
        private af: AngularFireDatabase,        
    ) {

      let firebaseConfig = {
        "apiKey": "AIzaSyBOS5aHHX2sgyNrQEFM8si1Gbw4Uns4Rbw",
        "authDomain": "ishallbe-de9a3.firebaseapp.com",
        "databaseURL": "https://ishallbe-de9a3.firebaseio.com",
        "projectId": "ishallbe-de9a3",
        "storageBucket": "ishallbe-de9a3.appspot.com",
        "messagingSenderId": "881822459028"
      }
        if (!firebase.apps.length) {
            firebase = firebase.default;
            firebase.initializeApp(firebaseConfig);
        }
        this.storage = firebase.storage();
    }

    instance() {
        return firebase.default;
    }

    push(path: string, data: any) {
      return Observable.create((observer:any) => {
        this.af.list(path).push(data).then(firebaseNewData => {
          observer.next(firebaseNewData.key);
        }, error => {
          observer.error(error);
        });
  
      });
    }

    set(path:string, data:any) {
      return Observable.create((observer:any) => {        
        return this.af.object(path).set(data).then((result:any)=>{
          observer.next(result);
        }, error => {
          observer.error(error);
        });
      });
    }

    query(path: string, fieldName: any, fieldValue: string): Observable <any> {
      return this.af.list(path, ref => ref.
        orderByChild(fieldName).equalTo(fieldValue)).valueChanges();
    }
  
    list(path: string) {
      return this.af.list(path);
    }
  
    object(path: string) {
      return this.af.object(path);
    }
  
    update(path: string, data: any) {
      return Observable.create((observer:any) => {        
        return this.af.object(path).update(data).then((result:any)=>{
          observer.next(result);
        }, error => {
          observer.error(error);
        });
      });
    }

    remove(path: string) {
      return Observable.create((observer:any) => {        
        return this.af.object(path).remove().then((result)=>{
          observer.next(result);
        }, error => {
          observer.error(error);
        })
      });
    }

  }