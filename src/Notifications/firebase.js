var admin = require("firebase-admin");
var serviceAccount = require("../../portal-mo-firebase-adminsdk-rpo7t-5c4c9c8cf2.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://portal-mo.firebaseio.com"
});

module.exports = {
    urgentMessage(registrationTokens, alert) {
        let stringAlert = JSON.stringify(alert);
        let message = {
            data: { stringAlert },
            notification: {
                body: 'Esta vaga precisa de você agora!',
                title: 'Precisamos de Você',
            },
            tokens: registrationTokens
        };
        admin.messaging().sendMulticast(message).then((res) => {
            if (res.failureCount > 0) {
                let failedTokens = [];
                res.responses.forEach((resp, idx) => {
                    if (!resp.success) {
                        failedTokens.push(registrationTokens[idx])
                    }
                });
                console.log('List of tokens that caused failures: urgentMessage ' + failedTokens);
            }
        })
            .catch(e => { console.log(e) })


    },
    sendMessage(registrationTokens) {

        let message = {
            notification: {
                body: 'This is an FCM notification that displays an image!',
                title: 'FCM Notification',
            },
            tokens: registrationTokens
        };

        admin.messaging().sendMulticast(message).then((res) => {
            if (res.failureCount > 0) {
                let failedTokens = [];
                res.responses.forEach((resp, idx) => {
                    if (!resp.success) {
                        failedTokens.push(registrationTokens[idx])
                    }
                });
                console.log('List of tokens that caused failures: ' + failedTokens);
            }
        })
            .catch(e => { console.log(e) })

    },
    sendNotificationSelectionsUser(user, alert) {
        let stringAlert = JSON.stringify(alert);
        let message = {
            data: { stringAlert },
            notification: {
                body: `Você foi selecionado! verifique o alerta de código ${alert.alert_id}`,
                title: 'Você foi selecionado',
            },
            token: user
        };
        admin.messaging().send(message).then(
            res => {
                console.log('Successfully sent message:', res);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });

    }
};
