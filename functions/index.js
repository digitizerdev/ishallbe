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
    let payload = {
        notification: {
            title: message.name + " " + message,
        },
        message: message
    }
    console.log(payload);
    pushNotification(message.token);
    return true;
});

function pushNotification(token) {
    admin.messaging().sendToDevice(token)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}