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
    if (!this.uid)
      this.uid = this.navParams.get("id");
    console.log("User id is " + this.uid);
    this.flagReadChat();
    this.loadUser();
    this.loadMessages();
  }

  flagReadChat() {
    console.log("Flagging read chat");
    let chatPath = "users/" + this.firebase.user.uid + "/chats/" + this.uid;
    console.log("Chats path is " + chatPath);
    this.firebase.afs.doc(chatPath).update({newMessages: false});
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
      if (!this.newChat) {
        console.log("Old Chat");
        this.addSenderMessage(newMessage);
        this.addReceiverMessage(newMessage);
        this.flagNewMessage();
      } else {
        this.createSenderChat(newMessage);
        this.createReceiverChat(newMessage);
      }
    }
  }

  createSenderChat(newMessage) {
    console.log("Creating Sender Chat")
    this.buildSenderChat().subscribe((chat) => {
      let chatPath = "users/" + this.firebase.user.uid +"/chats/" + chat.id
      console.log("Chat path is " + chatPath);
      this.firebase.afs.doc(chatPath).set(chat).then(() => {
        this.addSenderMessage(newMessage);
      });
    });
  }

  buildSenderChat() {
    console.log("Building Sending Chat");
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

  addSenderMessage(newMessage) {
    console.log("Adding Sender Message");
    this.buildSenderMessage(newMessage).subscribe((message) => {
      this.sendNotification(message);
      let messagePath = "users/" + this.firebase.user.uid + "/chats/" + this.uid + "/messages/" + message.id;
      console.log("Message path is " + messagePath);
      this.firebase.afs.doc(messagePath).set(message);
      this.newMessage = "";
    });
  }

  buildSenderMessage(newMessage) {
    console.log("Building Sender Message");
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
      console.log("Sender Message Built");
      console.log(message);
      observer.next(message);
    });
  }

  createReceiverChat(newMessage) {
    console.log("Createing Receiver Chat");
    this.buildReceiverChat().subscribe((chat) => {
      let chatPath = "users/" + this.uid +"/chats/" + this.firebase.user.uid;
      console.log("Chat path is " + chatPath);
      this.firebase.afs.doc(chatPath).set(chat).then(() => {
        this.addReceiverMessage(newMessage);
      });
    });
  }

  buildReceiverChat() {
    console.log("Building Receiver Chat");
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
      console.log("Chat built");
      console.log(chat);
      observer.next(chat);
    });
  }

  addReceiverMessage(message) {
    console.log("Sending Receiver Message");
    this.buildReceiverMessage(message).subscribe((receivedMessage) => {
      let receivedMessagePath = "users/" + this.uid + "/chats/" + this.firebase.user.uid + "/messages/" + receivedMessage.id 
      console.log("Recieved message path is " + receivedMessagePath);
      this.firebase.afs.doc(receivedMessagePath).set(receivedMessage);
    });
  }

  buildReceiverMessage(newMessage) {
    console.log("Building Receiver Message");
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
      console.log("Received Message Built");
      console.log(message);
      observer.next(message);
    });
  }

  flagNewMessage() {
    console.log("Flagging New Message");
    let chatPath = "users/" + this.uid + "/chats/" + this.firebase.user.uid;
    console.log("Chat path is " + chatPath);
    this.firebase.afs.doc(chatPath).update({ newMessages: true });
  }

  sendNotification(message) {
    console.log("Sending Notification");
    console.log(message);
    this.buildNotification(message).subscribe((notification) => {
      let notificationPath = "notifications/" + notification.id;
      console.log("Notification path is " + notificationPath);
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
        description: "sent you a message",
        read: false,
        collection: "users",
        docId: message.id,
        receiverUid: this.uid,
        token: this.user.fcmToken,
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

  viewUser(user) {
    console.log("Viewing User");
    this.navCtrl.push(ProfilePage, { uid: user.uid });
  }
}
