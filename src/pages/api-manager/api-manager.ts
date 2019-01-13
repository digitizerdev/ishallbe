import { Component } from '@angular/core';

import { IonicPage } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
    this.userCollection = this.firebase.afs.collection('users');
    this.userCollection.valueChanges().subscribe((users) => {
      this.users = users;
    });
  }

  loadPins() {
    this.pinCollection = this.firebase.afs.collection('pins');
    this.pinCollection.valueChanges().subscribe((pins) => {
      this.pins = pins;
    });
  }

  loadStatements() {
    this.statementCollection = this.firebase.afs.collection('statements');
    this.statementCollection.valueChanges().subscribe((statements) => {
      this.statements = statements;
    });
  }

  loadGoals() {
    this.goalCollection = this.firebase.afs.collection('goals');
    this.goalCollection.valueChanges().subscribe((goals) => {
      this.goals = goals;
    });
  }
  openLink() {
    this.iab.create('https://tdct.io', '_system');
  }
}
