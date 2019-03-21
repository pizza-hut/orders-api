// controller.js
// Import order model
Order = require('./order-model');

const config = require('./config');
const uuid = require('uuid/v5');

function OrderResponse(orderId) {
    this.orderId = orderId;
};

// Handle index actionss
exports.index = function (req, res) {
    console.log("orders api index");
    Order.get(function (err, orders) {
        if (err) {
            res.json({
                status: "500",
                message: "Error Message:" + err,
            });
        }
        res.json({
            status: "200",
            message: "orders retrieved successfully",
            data: orders
        });
    });
};

// Handle create order actions
exports.new = function (req, res) {
    var order = new Order();
    //console.log("requestor:" + req.body.requestor);
    //console.log("JSON:" + JSON.stringify(req.body.items));
    
    order.orderId = uuid(config.get('server.hostName'), uuid.DNS);
    console.log('orderId ' + order.orderId);
    
    order.items = req.body.items.slice();
    order.totalCost = req.body.totalCost;        

// save the order and check for errors
    order.save(function (err) {
        if (err) res.json(err);
        console.log('order ' + order);
        res.status(201);
        res.json({
            status: 'success',
            message: 'New order created!',
            data: order.orderId
        });
    });
};

// Handle view order info
exports.view = function (req, res) {
    Order.findById(req.params.order_id, function (err, order) {
        if (err) res.send(err);
        res.json({
            status: '200',
            message: 'order ' + req.params.order_id + ' details',
            data: order
        });
    });
};


// Handle update order info
exports.update = function (req, res) {
Order.findById(req.params.order_id, function (err, order) {
        if (err)
            res.send(err);
        console.log(JSON.stringify(req.body.items));
        order.items = req.body.order.items.slice();        
        order.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                status: '201',
                message: 'product information is updated',
                data: order
            });
        });
    });
};

// Handle delete order
exports.delete = function (req, res) {
    Order.remove({ _id: req.params.order_id}, function (err, order) {
        if (err)
            res.send(err);
        res.json({
        status: "201",
        message: 'Order is deleted'
            });
        });
};

//Get order items
exports.getItems = function(req, res) {
    Order.findById(req.params.order_id, function(err, order) {
        console.log(req.params);
        res.json({
            status: '200',
            data: order.items.slice()
        });
    });                                                
                                                    
};

//Add a new item to order
exports.newItem = function (req, res) {
    Order.findById(req.params.order_id, function (err, order) {        
        var itemId = order.items.length + 1;
        var item ={"productId":req.body.productId, "productLink":req.body.productLink};
        order.items.push(item);
        console.log(order.items);      
        order.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                status: '201',
                message: 'Item No.' + order.items.length + ' is added',
                data: order.items.slice(order.items.length -1)
            });
        });
    });
};
                  
//view a specific item in order
exports.viewItem = function (req, res) {
    Order.findById(req.params.order_id, function(err, order) {
        if (err)
            res.send(err);
        res.json({
            status: "200",
            data: order.items.slice(req.params.itemIndex, req.params.itemIndex+1) 
        });
    });
};