var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var flowers_controller = require('../controllers/flowers');

/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// flowers ROUTES ///
// POST request for creating a flowers.
router.post('/flowers', flowers_controller.flowers_create_post);
// DELETE request to delete flowers.
router.delete('/flowers/:id', flowers_controller.flowers_delete);
// PUT request to update flowers.
router.put('/flowers/:id', flowers_controller.flowers_update_put);
// GET request for one flowers.
router.get('/flowers/:id', flowers_controller.flowers_detail);
// GET request for list of all flowers items.
router.get('/flowers', flowers_controller.flowers_list);
module.exports = router;