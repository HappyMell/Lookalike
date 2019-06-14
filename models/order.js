var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    cart: {
        type: Object,
        required: true
    },
    address: {
        Type: String,

    },
    name: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Order", orderSchema);