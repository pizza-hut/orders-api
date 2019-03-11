// api-routes.js
// Initialize express router

const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));

   /**
     * @swagger
     *
     * /orders:
     *   get:
     *     description: get list of Orders
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: orders
     */
router.get('/', function (req, res) {
    res.json({
        status: '200',
        message: 'Orders API',
    });
    console.log("logging /");
});

// Import product controller
var controller = require('./controller');

router.route('/orders')
    .get(controller.index)
    .post(controller.new);

router.route('/orders/:order_id')
    .get(controller.view)
    .patch(controller.update)
    .put(controller.update)
    .delete(controller.delete);

router.route('/orders/:order_id/items')
    .post(controller.newItem)
    .get(controller.getItems)

router.route('/orders/:order_id/items/:itemIndex')
    .get(controller.viewItem)

// Export API routes
module.exports = router;