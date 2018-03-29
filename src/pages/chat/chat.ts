import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';

import { mockMessages } from '../../../test-data/messages/mocks';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  chatId: string;
  messages: any[] = [];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.chatId = this.navParams.get("id");
    this.setMessages();
  }

  setMessages() {
    mockMessages.forEach((message) => {
      this.messages.push(message);
    });
    console.log(this.messages);
  }

  viewUser(user) {
    this.navCtrl.push(ProfilePage, { uid: user.uid});
  }
}
