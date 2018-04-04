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
  newMessage: string;
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
    this.loadUser();
    this.loadMessages();
  }

  loadUser() {
    console.log("Loading User");
    let userPath = "users/" + this.uid;
    console.log("User path is " + userPath);
    this.userDoc = this.firebase.afs.doc(userPath);
    this.userDoc.valueChanges().subscribe((user) => {
      console.log("Got User");
      console.log(user);
      this.user = user;
    });
  }

  loadMessages() {
    console.log("Loading Messages");
    let messagesPath = "users/" + this.firebase.user.uid + "/chats/" + this.uid + "/messages"
    console.log("Messages path is " + messagesPath);
    this.messagesCol = this.firebase.afs.collection(messagesPath, ref => ref.orderBy('timestamp', 'asc'))
    this.messagesCol.valueChanges().subscribe((messages) => {
      console.log("Got messages");
      console.log(messages);
      if (messages.length > 0) this.newChat = false;
      this.setMessages(messages);
    });
  }

  setMessages(messages) {
    console.log("Setting Messages");
    this.messages = [];
    messages.forEach((message) => {
      let date = moment.unix(message.timestamp);
      message.displayTimestamp = moment(date).fromNow();
      console.log("Pushing message");
      this.messages.push(message);
    });
  }

  sendMessage(newMessage) {
    console.log("Sending message");
    console.log(newMessage);
    if (newMessage) {
      if (!this.newChat)
        this.addMessage(newMessage);
      else {
        this.buildChat().subscribe((chat) => {
          let chatPath = "chats/" + this.firebase.user.uid;
          console.log("Chat path is " + chatPath);
          this.firebase.afs.doc(chatPath).set(chat).then(() => {
            this.addMessage(newMessage);
          });
        });
      }
    }
  }


  addMessage(newMessage) {
    console.log("Adding Message");
    this.buildMessage(newMessage).subscribe((message) => {
      this.sendNotification(message);
      let messagePath = "users/" + this.firebase.user.uid + "/chats/" + this.uid + "/messages/" + message.id;
      console.log("Message path is " + messagePath);
      this.firebase.afs.doc(messagePath).set(message);
      this.newMessage = "";
    });
  }

  buildMessage(newMessage) {
    console.log("Building Message");
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
      console.log("Message Built");
      console.log(message);
      observer.next(message);
    });
  }

  sendNotification(message) {
    console.log("Sending Notification");
    console.log(message);
    this.buildNotification(message).subscribe((notification) => {
      let notificationPath = "notifications/" + notification.id;
      console.log("Notification path is " + notification);
      this.firebase.afs.doc(notificationPath).set(notification);
    });
  }

  buildNotification(message) {
    console.log("Building Notification");
    return Observable.create((observer) => {
      let id = this.firebase.afs.createId();
      let displayTimestamp = moment().format('MMM DD YYYY');
      let timestamp = moment().unix();
      let notification: Notification = {
        id: id,
        uid: this.firebase.user.uid,
        name: this.firebase.user.name,
        face: this.firebase.user.photo,
        description: "sent a message",
        read: false,
        collection: "users",
        docId: message.id,
        receiverUid: this.uid,
        message: true,
        pinLike: false,
        pinComment: false,
        pinCommentLike: false,
        statementLike: false,
        statementComment: false,
        statementCommentLike: false,
        goalLike: false,
        goalComment: false,
        goalCommentLike: false,
        reminder: false,
        displayTimestamp: displayTimestamp,
        timestamp: timestamp
      }
      console.log("Notification Built");
      console.log(notification);
      observer.next(notification);
    });
  }

  buildChat() {
    console.log("Building Chat");
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
      console.log("Chat built");
      console.log(chat);
      observer.next(chat);
    });
  }

  viewUser(user) {
    this.navCtrl.push(ProfilePage, { uid: user.uid });
  }
}
