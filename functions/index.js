const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.hourly_job =
    functions.pubsub.topic('hourly-tick').onPublish((event) => {
        console.log("This job is ran every hour!");
        let allNotifications = firestore.collection('notifications', ref => ref.orderBy('timestamp'));
        allNotifications.valueChanges().subscribe((notificaitons) => {
            console.log("Got Notifications");
            console.log(notifications);
        });
        return;
    });

exports.createMessage = functions.firestore.document('notifications/{notificationId}').onCreate(event => {
    console.log("Create Message Triggered");
    let message = event.data.data();
    console.log(message);
    let title = message.name + " " + message.description;
    console.log("Notification title is " + title);
    let payload = {
        notification: {
            title: title
        },
        message: message
    }
    console.log(payload);
    pushNotification(message.receiverUid);
    return true;
});

function pushNotification(uid) {
    let userPath = "users/" + uid;
    console.log("User path is " + userPath);
    return admin.firestore.doc(userPath).then((user) => {
        console.log("Got user");
        console.log(user);
        return admin.messaging().sendToDevice(user.fcmToken);
    }).catch((error) => {
        return error
    });
}