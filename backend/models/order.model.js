const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items: { type: String, required: true },
    status: { type: String, required: true }
}, {
    timestamps: true,
});

orderSchema.plugin(autoIncrement.plugin, 'Order');
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;