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
 * definitions:
 *   order:
 *     type: object
 *     properties:
 *       items:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             productId:
 *               type: string
 *             productLink:
 *               type: string,
 *             productOptionValues:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   option:
 *                     type: string
 *                   value:
 *                     type: string            
 *             quantity:
 *               type: integer
 *             price:
 *               type: number
 *               format: double
 *             subTotal:
 *               type: number
 *               format: double     
 *       totalCost:
 *         type: number
 *         format: double 
 *       createdDate:
 *         type: string
 *         format: date-time     
 */



/**
 * @swagger
 *
 * /:
 *   get:
 *     description: testing endpoint
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: ok response
 *         
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

   /**
     * @swagger
     *
     * /api/orders:
     *   get:
     *     description: get list of orders
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         description: ok response
     *         schema:
     *           $ref: '#/definitions/order'
     */
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