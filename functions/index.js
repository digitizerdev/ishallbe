const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createPin = functions.firestore.document('pins/{pinId}').onCreate(event => {
    console.log("Create Pin Triggered");
    let pin = event.data.data();
    let payload = {
        notification: {
            title: "New Pin Added: " + pin.displayAffirmationDate + pin.title,
            id: pin.id,
            uid: message.uid
        }
    }
    console.log(payload);
    pushEditorNotification(payload);
    return true;
});

function pushEditorNotification(payload) {
    admin.messaging().sendToTopic("editor", payload)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}

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
    let user = getReceiverDeviceToken(message.receiverUid);
    let payload = {
        token: user.fcmToken,
        notification: {
            title: message.name + " " + message,
        },
        message: message
    }
    console.log(payload);
    pushEditorNotification(payload);
    return true;
});

function getReceiverDeviceToken(uid) {
    console.log("Getting Receiver Device Token");
    let userPath = "users/" + uid;
    let user = functions.firestore.afs.doc(userPath);
    user.valueChanges().subscribe((user) => {
        console.log("Got user");
        console.log(user);
        return user;
    });
}

function pushNotification(payload) {
    admin.messaging().sendToDevice(payload.token)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
}