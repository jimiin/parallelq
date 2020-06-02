const router = require('express').Router();
let Order = require('../models/order.model');

const valid_status = Object.freeze({
    PREPARING: 'preparing',
    PREPARED: 'prepared',
    PAST: 'past'
});

router.route('/').get((req, res) => {
    Order.find()
        .sort('_id')
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/status/'+valid_status.PREPARING).get((req, res) => {
    Order.find({ status: valid_status.PREPARING })
        .sort('_id')
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/status/'+valid_status.PREPARED).get((req, res) => {
    Order.find({ status: valid_status.PREPARED })
        .sort('_id')
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/status/'+valid_status.PAST).get((req, res) => {
    Order.find({ status: valid_status.PAST })
    .sort('_id')
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const items = req.body.items;
    const newOrder = new Order({
        items,
        status: "preparing"
    });

    newOrder.save()
        .then(() => res.json('Order added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    
});

router.route('/change_status/:status/:id').post((req, res) => {
    const id = req.params.id;
    const status = req.params.status;

    Order.findById(id)
        .then(order => {
            if (Object.values(valid_status).includes(status)) {
                order.status = status;

                order.save()
                    .then(() => res.json('Order status updated'))
                    .catch(err => res.status(400).json('Error: ' + err));
            } else {
                res.status(400).json('Error: Invalid status')
            }
            
        })
        .catch(err => res.status(400).json('Error: ' + err));
    
});

module.exports = router;