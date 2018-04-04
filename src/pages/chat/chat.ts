import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  uid: string;
  messagesCol: any;
  messages: any[] = [];
  newChat = true;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.uid = this.navParams.get("uid");
    console.log("User id is " + this.uid);
    this.loadMessages();
  }

  loadMessages() {
    console.log("Loading Messages");
    let messagesPath = "chats/" + this.firebase.user.uid + "/" + this.uid;
    console.log("Messages path is " + messagesPath);
    this.messagesCol = this.firebase.afs.collection(messagesPath)
    this.messagesCol.valueChanges().subscribe((messages) => {
      console.log("Got messages");
      console.log(messages);
      if (messages.length > 0) this.newChat = false;
    });
  }
  viewUser(user) {
    this.navCtrl.push(ProfilePage, { uid: user.uid});
  }
}
