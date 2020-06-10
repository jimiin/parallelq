const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items: { type: String, required: true },
    restaurant_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    total_price: { type: Number, required: true },
    status: { type: String, required: true },
}, {
    timestamps: true,
});

orderSchema.plugin(autoIncrement.plugin, 'Order');
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;