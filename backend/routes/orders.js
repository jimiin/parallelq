const router = require('express').Router();
let Order = require('../models/order.model');

const STASUSES = Object.freeze({
    PREPARING: 'preparing',
    PREPARED: 'prepared',
    PAST: 'past',
    CANCELLED: 'cancelled',
    CANCELLED_RESOLVED: 'cancelled_resolved',
});

function oldAppendQueuePos(initialOrders, posMap) {
    orders = [];
    initialOrders.forEach(e => orders.push(e.toObject()));
    for (let i = 0; i < orders.length; i++) {
        orders[i].queuePosition = 0;
        for (j = 0; j < orders.length; j++) {
            if (orders[j].status == 'preparing' && orders[j]._id < orders[i]._id) {
                orders[i].queuePosition++;
            }
        }
    }
    return orders;
}

function appendQueuePos(initialOrders, posMap) {
    orders = [];
    initialOrders.forEach(e => orders.push(e.toObject()));
    for (let i = 0; i < orders.length; i++) {
        orders[i].queuePosition = posMap.get(orders[i]._id);
    }
    return orders;
}

function getPosMap(orders) {
    let posMap = new Map();
    for (let i = 0; i < orders.length; i++) {
        posMap.set(orders[i]._id , 0);
        if (orders[i].status != 'preparing') continue;
        for (j = 0; j < orders.length; j++) {
            if (orders[j].status == 'preparing' && orders[j]._id < orders[i]._id) {
                posMap.set(orders[i]._id , posMap.get(orders[i]._id) + 1);
            }
        }
    }
    return posMap;
}

// DEPRECATED
router.route('/all').get((req, res) => {
    Order.find()
        .sort('_id')
        .then(orders => res.json(oldAppendQueuePos(orders)))
        .catch(err => res.status(400).json('Error: ' + err));
})

function getHelper(req, res, query) {
    let initialQuery = Order.find();
    initialQuery.then(initialOrders => {
        let posMap = getPosMap(initialOrders);
        initialQuery
            .find(query)
            .sort('_id')
            .then(orders => {
                res.json(appendQueuePos(orders, posMap));
            })
            .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
}

router.route('/user_status/:uid/:status').get((req, res) => {
    const user_id = req.params.uid;
    const status = req.params.status;
    if (Object.values(STASUSES).includes(status)) {
        getHelper(req, res, {user_id, status})
    } else {
        res.status(400).json('Error: Invalid status')
    }
})

router.route('/user/:uid').get((req, res) => {
    const user_id = req.params.uid;
    getHelper(req, res, {user_id});
})

router.route('/restaurant_status/:rid/:status').get((req, res) => {
    const restaurant_id = req.params.rid;
    const status = req.params.status;
    if (Object.values(STASUSES).includes(status)) {
        Order
        .find({restaurant_id, status})
        .sort('_id')
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err));
    } else {
        res.status(400).json('Error: Invalid status')
    }
})

router.route('/restaurant/:rid').get((req, res) => {
    const restaurant_id = req.params.rid;
    Order
        .find({restaurant_id})
        .sort('_id')
        .then(orders => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const items = req.body.items;
    const restaurant_id = req.body.restaurant_id;
    const user_id = req.body.user_id;
    const total_price = req.body.total_price;
    const newOrder = new Order({
        items,
        restaurant_id,
        user_id,
        total_price,
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
            if (Object.values(STASUSES).includes(status)) {
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