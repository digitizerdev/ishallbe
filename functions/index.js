const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
    console.log("Hello World Triggered");
    response.send("Hello World from Firebase!");
});

exports.createPin = functions.firestore.document('pins/{pinId}').onCreate(event => {
    console.log("Create Pin Triggered");
    var newValue = event.data.data();
    console.log(newValue);
    var message = "New Pin Added : " + newValue.title;
    pushMessage(message);
    return true;
});

function pushMessage(message) {
    console.log("Push Message Triggered");
    console.log("Message is " + message);
    var payload = {
        notification: {
            title: message,
        }
    };
    admin.messaging().sendToTopic("notifications", payload)
        .then(function (response) {
            console.log("Successfully sent message:", response);
            return response;
        })
        .catch(function (error) {
            console.log("Error sending message:", error);
            return error;
        });
}
