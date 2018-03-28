import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { mockMessages } from '../../../test-data/messages/mocks';

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  chats: any[] = [];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
    this.setMessages();
  }

  setMessages() {
    mockMessages.forEach((message) => {
      this.chats.push(message);
    });
  }

}
