const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.hourly_job =
    functions.pubsub.topic('hourly-tick').onPublish((event) => {
        console.log("Cron Hourly Tick");
        let allNotifications = firestore.collection('notifications', ref => ref.orderBy('timestamp'));
        allNotifications.valueChanges().subscribe((notificaitons) => {
            console.log("Got Notifications");
            console.log(notifications);
        });
        return;
    });

exports.updateProfilePosts = functions.firestore.document('users/{userId}').onCreate(user => {
    console.log("Updating Profile Posts");
    let profile = user.data.data();
    console.log(profile);
    return true;
});

exports.createNotification = functions.firestore.document('notifications/{notificationId}').onCreate(event => {
    let message = event.data.data();
    let pushMessage = message.name + " " + message.description;
    let payload = { notification: {
            body: pushMessage,
            uid: message.receiverUid }
    }
    let fireData = admin.firestore();
    let userPath = "users/" + message.receiverUid;
    let user = fireData.doc(userPath);
    return user.get().then((user) => {
        contributor = user.data();
        admin.messaging().sendToDevice(contributor.fcmToken, payload);
        return true;
    });
});