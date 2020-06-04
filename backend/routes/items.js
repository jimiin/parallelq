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

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const newItem = new Item({
        name,
        price,
        description,
        status: AVAILABILITIES.AVAILABLE
    });

    newItem.save()
        .then(() => res.json('Item added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    
});

router.route('/change_status/:status/:id').post((req, res) => {
    const id = req.params.id;
    const status = req.params.status;

    Item.findById(id)
        .then(item => {
            if (Object.values(AVAILABILITIES).includes(status)) {
                item.status = status;

                item.save()
                    .then(() => res.json('Item status updated'))
                    .catch(err => res.status(400).json('Error: ' + err));
            } else {
                res.status(400).json('Error: Invalid status')
            }
            
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;