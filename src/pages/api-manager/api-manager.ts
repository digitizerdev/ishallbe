import { Component } from '@angular/core';

import { IonicPage, NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { HomePage } from '../home/home';

import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import { User } from '../../../test-data/users/model';
import { Pin } from '../../../test-data/pins/model';
import { Statement } from '../../../test-data/statements/model';
import { Goal } from '../../../test-data/goals/model';


@IonicPage()
@Component({
  selector: 'page-api-manager',
  templateUrl: 'api-manager.html',
})
export class ApiManagerPage {

  userCollection: AngularFirestoreCollection<User>;
  pinCollection: AngularFirestoreCollection<Pin>;
  statementCollection: AngularFirestoreCollection<Statement>;
  goalCollection: AngularFirestoreCollection<Goal>;
  users = [];
  pins = [];
  statements = [];
  goals = [];

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider,
    public iab: InAppBrowser
  ) {
  }

  ionViewDidLoad() {
    this.loadUsers();
    this.loadPins();
    this.loadStatements();
    this.loadGoals();  }

  loadUsers() {
    console.log("Loading Users");
    this.userCollection = this.firebase.afs.collection('users');
    this.userCollection.valueChanges().subscribe((users) => {
      console.log("Users length is " + users.length);
      this.users = users;
    });
  }

  loadPins() {
    console.log("Loading Pins");
    this.pinCollection = this.firebase.afs.collection('pins');
    this.pinCollection.valueChanges().subscribe((pins) => {
      console.log("Pins length is " + pins.length);
      this.pins = pins;
    });
  }

  loadStatements() {
    console.log("Loading Statements");
    this.statementCollection = this.firebase.afs.collection('statements');
    this.statementCollection.valueChanges().subscribe((statements) => {
      console.log("Statements length is " + statements.length);
      this.statements = statements;
    });
  }

  loadGoals() {
    console.log("Loading Goals");
    this.goalCollection = this.firebase.afs.collection('goals');
    this.goalCollection.valueChanges().subscribe((goals) => {
      console.log("Goals length is " + goals.length);
      this.goals = goals;
    });
  }
  openLink() {
    this.iab.create('https://tdct.io', '_system');
  }
}
