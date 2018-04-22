import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { ChatPage } from '../chat/chat';
import { HomePage } from '../home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {

  chatsCol: any;
  newChats: any[] = [];
  earlierChats: any[] = [];
  
  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.loadChats();
  }

  loadChats() {
    let chatsPath = "users/" + this.firebase.user.uid + "/chats";
    this.chatsCol = this.firebase.afs.collection(chatsPath);
    this.chatsCol.valueChanges().subscribe((chats) => {
      this.setChats(chats);
    });
  }

  setChats(chats) { 
    this.newChats = [];
    this.earlierChats = [];
    chats.forEach((chat) => {
      if (chat.newMessages)
        this.newChats.push(chat);
      else 
        this.earlierChats.push(chat);
    });
  }

  viewChat(chat) {
    this.navCtrl.push(ChatPage, { id: chat.id });
  }

  viewUser(uid) {
    if (uid !== this.firebase.user.uid)
      this.navCtrl.push(ProfilePage, { uid: uid});
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

}
