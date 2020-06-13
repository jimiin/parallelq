const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .sort('_id')
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})

// Don't use this apart from testing purposes.
router.route('/add_test').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const gid = req.body.gid;
    const newUser = new User({
        name,
        email,
        gid
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/verify').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const gid = req.body.gid;
    const notification_token = req.body.notification_token;

    // Setup stuff
    var query = { gid };
    var update = { name, email, gid, notification_token };
    var options = { upsert: true, new: true, setDefaultsOnInsert: true };

    // Find the document
    User.findOneAndUpdate(query, update, options)
        .then(result => {
            res.json({ gid: result.gid })
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;