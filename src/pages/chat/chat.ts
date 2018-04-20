import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs';
import moment from 'moment';

import { ProfilePage } from '../profile/profile';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import { Chat } from '../../../test-data/chats/model';
import { Message } from '../../../test-data/messages/model';
import { Notification } from '../../../test-data/notifications/model';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  uid: string;
  messagesCol: any;
  messages: any[] = [];
  userDoc: any;
  user: any;
  newChat = true;
  chatForm: {
    description?: string
  } = {};

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.uid = this.navParams.get("uid");
    if (!this.uid)
      this.uid = this.navParams.get("id");
    this.flagReadChat();
    this.loadUser();
    this.loadMessages();
  }

  flagReadChat() {
    let chatPath = "users/" + this.firebase.user.uid + "/chats/" + this.uid;
    let chat = this.firebase.afs.doc(chatPath);
    chat.valueChanges().subscribe((messages) => {
      if (messages) {
        chat.update({newMessages: false});
      }
    });
  }

  loadUser() {
    let userPath = "users/" + this.uid;
    this.userDoc = this.firebase.afs.doc(userPath);
    this.userDoc.valueChanges().subscribe((user) => {
      this.user = user;
    });
  }

  loadMessages() {
    let messagesPath = "users/" + this.firebase.user.uid + "/chats/" + this.uid + "/messages"
    this.messagesCol = this.firebase.afs.collection(messagesPath, ref => ref.orderBy('timestamp', 'asc'))
    this.messagesCol.valueChanges().subscribe((messages) => {
      if (messages.length > 0) this.newChat = false;
      this.setMessages(messages);
    });
  }

  setMessages(messages) {
    this.messages = [];
    messages.forEach((message) => {
      let date = moment.unix(message.timestamp);
      message.displayTimestamp = moment(date).fromNow();
      this.messages.push(message);
    });
  }

  submit(chatForm) {
    if (chatForm.description) {
      if (!this.newChat) {
        this.addSenderMessage(chatForm.description);
        this.addReceiverMessage(chatForm.description);
        this.flagNewMessage();
        chatForm.description = ""
      } else {
        this.createSenderChat(chatForm.description);
        this.createReceiverChat(chatForm.description);
      }
    }
  }

  createSenderChat(newMessage) {
    this.buildSenderChat().subscribe((chat) => {
      let chatPath = "users/" + this.firebase.user.uid +"/chats/" + chat.id
      this.firebase.afs.doc(chatPath).set(chat).then(() => {
        this.addSenderMessage(newMessage);
      });
    });
  }

  buildSenderChat() {
    return Observable.create((observer) => {
      let displayTimestamp = moment().format('MMM DD YYYY');
      let timestamp = moment().unix();
      let chat: Chat = {
        id: this.uid,
        name: this.user.name,
        face: this.user.photo,
        timestamp: timestamp,
        displayTimestamp,
        newMessages: false
      }
      observer.next(chat);
    });
  }

  addSenderMessage(newMessage) {
    this.buildSenderMessage(newMessage).subscribe((message) => {
      this.sendNotification(message);
      let messagePath = "users/" + this.firebase.user.uid + "/chats/" + this.uid + "/messages/" + message.id;
      this.firebase.afs.doc(messagePath).set(message);
      this.chatForm.description = null;
    });
  }

  buildSenderMessage(newMessage) {
    return Observable.create((observer) => {
      let id = this.firebase.afs.createId();
      let displayTimestamp = moment().format('MMM DD YYYY');
      let timestamp = moment().unix();
      let message: Message = {
        id: id,
        received: false,
        sent: true,
        face: this.firebase.user.photo,
        name: this.firebase.user.name,
        description: newMessage,
        displayTimestamp: displayTimestamp,
        timestamp: timestamp
      }
      observer.next(message);
    });
  }

  createReceiverChat(newMessage) {
    this.buildReceiverChat().subscribe((chat) => {
      let chatPath = "users/" + this.uid +"/chats/" + this.firebase.user.uid;
      this.firebase.afs.doc(chatPath).set(chat).then(() => {
        this.addReceiverMessage(newMessage);
      });
    });
  }

  buildReceiverChat() {
    return Observable.create((observer) => {
      let displayTimestamp = moment().format('MMM DD YYYY');
      let timestamp = moment().unix();
      let chat: Chat = {
        id: this.firebase.user.uid,
        name: this.firebase.user.name,
        face: this.firebase.user.photo,
        timestamp: timestamp,
        displayTimestamp,
        newMessages: true
      }
      observer.next(chat);
    });
  }

  addReceiverMessage(message) {
    this.buildReceiverMessage(message).subscribe((receivedMessage) => {
      let receivedMessagePath = "users/" + this.uid + "/chats/" + this.firebase.user.uid + "/messages/" + receivedMessage.id 
      this.firebase.afs.doc(receivedMessagePath).set(receivedMessage);
    });
  }

  buildReceiverMessage(newMessage) {
    return Observable.create((observer) => {
      let id = this.firebase.afs.createId();
      let displayTimestamp = moment().format('MMM DD YYYY');
      let timestamp = moment().unix();
      let message: Message = {
        id: id,
        received: true,
        sent: false,
        face: this.firebase.user.photo,
        name: this.firebase.user.name,
        description: newMessage,
        displayTimestamp: displayTimestamp,
        timestamp: timestamp
      }
      observer.next(message);
    });
  }

  flagNewMessage() {
    let chatPath = "users/" + this.uid + "/chats/" + this.firebase.user.uid;
    this.firebase.afs.doc(chatPath).update({ newMessages: true });
  }

  sendNotification(message) {
    this.buildNotification(message).subscribe((notification) => {
      let notificationPath = "notifications/" + notification.id;
      this.firebase.afs.doc(notificationPath).set(notification);
    });
  }

  buildNotification(message) {
    return Observable.create((observer) => {
      let id = this.firebase.afs.createId();
      let displayTimestamp = moment().format('MMM DD YYYY');
      let timestamp = moment().unix();
      let notification: Notification = {
        id: id,
        uid: this.firebase.user.uid,
        name: this.firebase.user.name,
        face: this.firebase.user.photo,
        description: "sent you a message",
        read: false,
        collection: "users",
        docId: message.id,
        receiverUid: this.uid,
        message: true,
        pinLike: false,
        statementLike: false,
        goalLike: false,
        comment: false,
        commentLike: false,
        reminder: false,
        displayTimestamp: displayTimestamp,
        timestamp: timestamp
      }
      observer.next(notification);
    });
  }

  viewUser(user) {
    this.navCtrl.push(ProfilePage, { uid: user.uid });
  }
}
