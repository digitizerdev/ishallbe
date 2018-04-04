import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

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
    console.log('ionViewDidLoad ChatsPage');
    this.loadChats();
  }

  loadChats() {
    console.log("Loading Chats");
    let chatsPath = "users/" + this.firebase.user.uid + "/chats";
    console.log("Chats path is " + chatsPath);
    this.chatsCol = this.firebase.afs.collection(chatsPath);
    this.chatsCol.valueChanges().subscribe((chats) => {
      console.log("Got chats");
      console.log(chats);
      this.setChats(chats);
    });
  }

  setChats(chats) {
    console.log("Setting Chats");
    chats.forEach((chat) => {
      if (chat.newMessages)
        this.newChats.push(chat);
      else 
        this.earlierChats.push(chat);
        console.log("Pushing Chat");
        console.log(chat);
    });
  }

  viewChat(chat) {
    this.navCtrl.push(ChatPage, { id: chat.id });
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

}
