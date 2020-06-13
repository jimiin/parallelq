
const router = require('express').Router();
let User = require('../models/user.model');

const { Expo } = require('expo-server-sdk')

// Create a new Expo SDK client
let expo = new Expo();

router.route('/notify/user').post((req, res) => {
    const title = req.body.title;
    const body = req.body.body;
    const gid = req.body.user_id;

    sendPushNotification(title, body, gid)
        .then(result => res.json(result))
        .catch(err => res.status(400).json('Error: '+err));
});

// Helper functions for notification sending
async function sendPushNotification(title, body, gid) {
    let user;
    let token;

    try {
        user = await User.findOne({gid}).exec();
        token = user.notification_token;
    } catch(err) {
        console.error(`Error: Can't find user.`);
        return `Error: Can't find user.`;
    }

    if (!Expo.isExpoPushToken(token)) {
        console.error(`Error: Push token ${token} is not a valid Expo push token`);
        return(`Error: Push token ${token} is not a valid Expo push token`);
    }

    const message = {
        to: token,
        sound: 'default',
        title: title,
        body: body,
        data: { data: 'goes here' },
        _displayInForeground: true,
        channelId: 'default'
    };

    let chunks = expo.chunkPushNotifications([message]);
    let tickets = [];
    (async () => {
        // Send the chunks to the Expo push notification service. There are
        // different strategies you could use. A simple one is to send one chunk at a
        // time, which nicely spreads the load out over time:
        for (let chunk of chunks) {
            try {
            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            console.log(ticketChunk);
            tickets.push(...ticketChunk);
            // NOTE: If a ticket contains an error code in ticket.details.error, you
            // must handle it appropriately. The error codes are listed in the Expo
            // documentation:
            // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
            } catch (error) {
            console.error(error);
            }
        }
    })();
    return `Nofitication sent`;
}

module.exports = router;