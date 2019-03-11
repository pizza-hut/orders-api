// order-model.js
var mongoose = require('mongoose');
// Setup schema

var SchemaTypes = mongoose.Schema.Types;

var orderSchema = mongoose.Schema({
    
    items: [{
        //_id: Number,
        productId: String,
        productLink: String,
        productOptionValues: [{
            option: String,
            value: String
        }],
        quantity: Number,
        price: Number,
        subTotal: Number         
    }],    
                                      
    totalCost: {
        type: Number
    },
    
    createdDate: {
        type: Date,
        default: Date.now  
    }
});

// Export Order model
var Order = module.exports = mongoose.model('order', orderSchema);

module.exports.get = function (callback, limit) {
    Order.find(callback).limit(limit);
};