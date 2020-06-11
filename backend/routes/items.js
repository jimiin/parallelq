const router = require('express').Router();
let Item = require('../models/item.model');

const AVAILABILITIES = Object.freeze({
    AVAILABLE: 'available',
    UNAVAILABLE: 'unavailable'
});

router.route('/').get((req, res) => {
    Item.find()
        .sort('_id')
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:r_id').get((req, res) => {
    const restaurant_id = req.params.r_id;
    Item.find({restaurant_id})
        .sort('_id')
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const restaurant_id = req.body.restaurant_id;
    
    const newItem = new Item({
        name,
        price,
        description,
        availability: AVAILABILITIES.AVAILABLE,
        restaurant_id
    });

    newItem.save()
        .then(() => res.json('Item added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    
});

router.route('/delete/:id').delete((req, res) => {
    const _id = req.params.id;
    Item.findByIdAndDelete(_id)
        .then(item => res.json('Deleted :'+item._id))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    const _id = req.params.id;
    Item.findByIdAndDelete(_id)
        .then(item => res.json('Deleted :'+item._id))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/modify/:id').post((req, res) => {
    const _id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;

    Item.findById(_id)
        .then(item => {
            item.name = name;
            item.price = price;
            item.description = description;

            item.save()
                .then(() => res.json('Item updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;