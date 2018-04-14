const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.hourly_job =
    functions.pubsub.topic('hourly-tick').onPublish((event) => {
        console.log("Cron Hourly Tick");
        let fireData = admin.firestore();
        let goals = fireData.collection('goals');
        return goals.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log("Got goal");
                console.log(doc.data());
            });
            return;
        });
    });

exports.updateProfilePosts = functions.firestore.document('users/{userId}').onUpdate(event => {
    console.log("Updating Profile Posts");
    console.log(event);
    let user = event.data.data();
    console.log(user);
    return updateStatements(user).then(() => {
        return updateGoals(user);
    });
});

function updateStatements(user) {
    console.log("Updating Statements");
    console.log(user);
    console.log("User uid is " + user.uid);
    let fireData = admin.firestore();
    let userStatements = fireData.collection('statements').where("uid", "==", user.uid);
    return userStatements.get().then((querySnapshot) => {
        return querySnapshot.forEach((doc) => {
            let statement = doc.data();
            let statementPath = "statements/" + statement.id;
            console.log("Statement path is " + statementPath);
            let myStatement = fireData.doc(statementPath);
            return myStatement.update({
                face: user.photo,
                name: user.name
            });
        });
    });
}

function updateGoals(user) {
    console.log("Updating Goals");
    console.log(user);
    console.log("User uid is " + user.uid);
    let fireData = admin.firestore();
    let userGoals = fireData.collection('goals').where("uid", "==", user.uid);
    return userGoals.get().then((querySnapshot) => {
        return querySnapshot.forEach((doc) => {
            let goal = doc.data();
            let goalPath = "goals/" + goal.id;
            console.log("Goal path is " + goalPath);
            let myGoal = fireData.doc(goalPath);
            return myGoal.update({
                face: user.photo,
                name: user.name
            });
        });
    });
}

exports.createNotification = functions.firestore.document('notifications/{notificationId}').onCreate(event => {
    let message = event.data.data();
    let pushMessage = message.name + " " + message.description;
    let payload = {
        notification: {
            body: pushMessage,
        },
        data: {
            id: message.id,
            uid: message.uid,
            name: message.name,
            face: message.face,
            description: message.description,
            read: message.read.toString(),
            collection: message.collection,
            docId: message.docId,
            receiverUid: message.receiverUid,
            message: message.message.toString(),
            pinLike: message.pinLike.toString(),
            statementLike: message.statementLike.toString(),
            goalLike: message.goalLike.toString(),
            comment: message.comment.toString(),
            commentLike: message.commentLike.toString(),
            reminder: message.reminder.toString(),
            displayTimestamp: message.displayTimestamp,
            timestamp: message.timestamp.toString(),
        }
    }
    console.log("Built Payload");
    console.log(payload);
    let fireData = admin.firestore();
    let userPath = "users/" + message.receiverUid;
    let user = fireData.doc(userPath);
    return user.get().then((user) => {
        contributor = user.data();
        admin.messaging().sendToDevice(contributor.fcmToken, payload);
        return true;
    });
});