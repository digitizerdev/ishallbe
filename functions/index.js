const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment');
admin.initializeApp(functions.config().firebase);

function createGoalReminder(goal) {
    console.log("Creating Goal Reminder");
    console.log(goal);
    let fireData = admin.firestore();
    let id = goal.id + moment(new Date()).unix();
    console.log("Id is " + id);
    let displayTimestamp = moment().format('MMM DD YYYY');
    let timestamp = moment().unix();
    let description = "Your " + goal.title + " goal is due soon";
    let notification = {
        id: id,
        uid: goal.uid,
        name: goal.name,
        face: goal.face,
        title: goal.title,
        description: description,
        read: false,
        collection: "reminder",
        docId: goal.id,
        receiverUid: goal.uid,
        message: false,
        pinLike: false,
        statementLike: false,
        goalLike: false,
        commentLike: false,
        comment: false,
        reminder: true,
        displayTimestamp: displayTimestamp,
        timestamp: timestamp
    }
    console.log("Notification Built");
    console.log(notification);
    let goalReminderPath = "notifications/" + id;
    console.log("Goal reminder path is " + goalReminderPath);
    return fireData.doc(goalReminderPath).create(notification);
}

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
    let notification = event.data.data();
    if (notification.pin) {
        console.log("Creating Notification");
        console.log(notification);
        let pushMessage = notification.name + " " + notification.description;
        if (notification.reminder) pushMessage = "Your " + notification.title + " goal is due soon";
        let payload = {
            notification: {
                body: pushMessage,
            },
            data: {
                id: notification.id,
                uid: notification.uid,
                name: notification.name,
                face: notification.face,
                description: pushMessage,
                read: notification.read.toString(),
                collection: notification.collection,
                docId: notification.docId,
                receiverUid: notification.receiverUid,
                message: notification.message.toString(),
                pinLike: notification.pinLike.toString(),
                statementLike: notification.statementLike.toString(),
                goalLike: notification.goalLike.toString(),
                comment: notification.comment.toString(),
                commentLike: notification.commentLike.toString(),
                reminder: notification.reminder.toString(),
                displayTimestamp: notification.displayTimestamp,
                timestamp: notification.timestamp.toString(),
            }
        }
        console.log("Built Notification Payload");
        console.log(payload);
        let fireData = admin.firestore();
        let userPath = "users/" + notification.receiverUid;
        let user = fireData.doc(userPath);
        return user.get().then((user) => {
            console.log("Sending Notification to User");
            contributor = user.data();
            console.log(contributor);
            return admin.messaging().sendToDevice(contributor.fcmToken, payload);
        });
    }
});

function sendNotificationToAllUsers(notification) {
    console.log("Sending Notification to All Users");
    let date = moment(new Date());
    console.log("Moment Date is ");
    console.log(date);
    let currentTime = moment(new Date()).unix();
    console.log("Current time in unix is " + currentTime);
    let overNextHourTime = currentTime + 3600;
    console.log("Over Next Hour Time in unix is " + overNextHourTime);
    let fireData = admin.firestore();
    let notifications = fireData.collection('notifications').
    where("pin", "==", true).
    where("timestamp", ">=", currentTime).
    where("timestamp", "<=", overNextHourTime);
    return notifications.get().then((pendingNotifications) => {
        console.log(pendingNotifications);
        return pendingNotifications.forEach((pendingNotification) => {
            let notification = pendingNotification.data.data();
            console.log("Pushing Notification");
            console.log(notification);
            console.log("Push message is " + notification.description);
            let pushMessage = notification.description;
            let payload = {
                notification: {
                    body: pushMessage,
                },
                data: {
                    id: notification.id,
                    uid: notification.uid,
                    name: notification.name,
                    face: notification.face,
                    description: pushMessage,
                    read: notification.read.toString(),
                    collection: notification.collection,
                    docId: notification.docId,
                    receiverUid: notification.receiverUid,
                    message: notification.message.toString(),
                    pinLike: notification.pinLike.toString(),
                    statementLike: notification.statementLike.toString(),
                    goalLike: notification.goalLike.toString(),
                    comment: notification.comment.toString(),
                    commentLike: notification.commentLike.toString(),
                    reminder: notification.reminder.toString(),
                    displayTimestamp: notification.displayTimestamp,
                    timestamp: notification.timestamp.toString(),
                }
            }
            console.log("Built Notification Payload");
            console.log(payload);
            let users = fireData.collection('users');
            return users.get().then((allUsers) => {
                return allUsers.forEach((userDoc) => {
                    let user = userDoc.data();
                    console.log("User is ");
                    console.log(user);
                    admin.messaging().sendToDevice(user.fcmToken, payload);
                    return true;
                });
            });
        });
    });
}

function sendGoalReminders() {
    let date = moment(new Date());
    console.log("Moment Date is ");
    console.log(date);
    let currentTime = moment(new Date()).unix();
    console.log("Current time in unix is " + currentTime);
    let overNextHourTime = currentTime + 3600;
    console.log("Over Next Hour Time in unix is " + overNextHourTime);
    let fireData = admin.firestore();
    let goals = fireData.collection('goals').where("dueDate", ">=", currentTime).
    where("dueDate", "<=", overNextHourTime);
    return goals.get().then((pendingReminders) => {
        pendingReminders.forEach((doc) => {
            let goal = doc.data()
            console.log("Got goal");
            console.log(goal);
            console.log("Goal due date in unix is " + goal.dueDate);
            createGoalReminder(goal);
        });
        return;
    });
}

exports.hourly_job = functions.pubsub.topic('hourly-tick').onPublish((event) => {
    console.log("Cron Hourly Tick");
    return sendGoalReminders().then(() => {
        console.log("Sent Goal Reminders");
        return sendNotificationToAllUsers();
    })
});