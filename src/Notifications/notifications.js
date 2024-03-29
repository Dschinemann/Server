
module.exports = {
    sendNotification(data) {
        let headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Basic ${process.env.ONESIGNAL_KEY}`
        };

        let options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };
        let https = require('https');

        let req = https.request(options, (res) => {
            res.on('data', function (data) {

            });
        });
        req.on('error', function (e) {
            console.log(e)
        });

        req.write(JSON.stringify(data));
        req.end()
    },
    userNotification(data) {
        let headers = {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Basic ${process.env.ONESIGNAL_KEY}`
        };

        let options = {
            host: "onesignal.com",
            port: 443,
            path: "/api/v1/notifications",
            method: "POST",
            headers: headers
        };
        let https = require('https');

        let req = https.request(options, (res) => {
            res.on('data', function (data) {
               
            });
        });
        req.on('error', function (e) {
            console.log(e)
        });

        req.write(JSON.stringify(data));
        req.end()

    }
};





