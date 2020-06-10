const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: { type: String, required: true },
    image_dir: { type: String, required: true },
}, {
    timestamps: true,
});

restaurantSchema.plugin(autoIncrement.plugin, 'Restaurant');
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;