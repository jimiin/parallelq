const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    availability: { type: String, required: true },
    restaurant_id: { type: Number, required: true }
}, {
    timestamps: true,
});

itemSchema.plugin(autoIncrement.plugin, 'Item');
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;