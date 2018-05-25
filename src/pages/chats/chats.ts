import { Component } from '@angular/core';
import { trigger, 
  style, 
  transition, 
  animate, 
  query, 
  stagger } from '@angular/animations';

import { IonicPage, NavController } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { ChatPage } from '../chat/chat';
import { HomePage } from '../home/home';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(0,10px,0)` }), { optional: true }),
        query(':enter', stagger('100ms', [animate('300ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class ChatsPage {

  chatsCol: any;
  newChats: any[] = [];
  earlierChats: any[] = [];
  viewingUser = false;

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidEnter() {
    this.viewingUser = false;
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
    if (!this.viewingUser)
      this.navCtrl.push(ChatPage, { id: chat.id });
  }

  viewUser(uid) {
    console.log("Viewing User");
    this.viewingUser = true;
    if (uid !== this.firebase.user.uid)
      this.navCtrl.push(ProfilePage, { uid: uid });
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

}
