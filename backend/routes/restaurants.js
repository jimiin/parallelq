const router = require('express').Router();
let Restaurant = require('../models/restaurant.model');

router.route('/').get((req, res) => {
    Restaurant.find()
        .sort('_id')
        .then(restaurants => res.json(restaurants))
        .catch(err => res.status(400).json('Error: ' + err));
})

let Order = require('../models/order.model');

router.route('/with_queue_size').get(async (req, res) => {
    Restaurant.find()
        .sort('_id')
        .then(initialRestaurants => {
            let restaurants = [];
            initialRestaurants.forEach(e => restaurants.push(e.toObject()));
            for (let i = 0; i < restaurants.length; i++) {
                let orders = await Order.find({restaurant_id : restaurant[i]._id, status: 'preparing'});
                restaurants[i].queue_size = orders.length;
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:r_id').get((req, res) => {
    const restaurant_id = req.params.r_id;
    Restaurant.findById(restaurant_id)
        .then(restaurant => res.json(restaurant))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const image_dir = req.body.image_dir;
    const newRestaurant = new Restaurant({
        name,
        image_dir,
    });

    newRestaurant.save()
        .then(() => res.json('Restaurant added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    
});

module.exports = router;
