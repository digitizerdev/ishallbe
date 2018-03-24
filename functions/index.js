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
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        });
}
