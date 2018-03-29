import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ChatPage } from '../chat/chat';

import { mockChats } from '../../../test-data/chats/mocks';

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {

  newChats: any[] = [];
  earlierChats: any[] = [];
  
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
    this.setChats();
  }

  setChats() {
    mockChats.forEach((chat) => {
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

}
