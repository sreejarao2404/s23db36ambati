var express = require('express');
const flowers_controlers= require('../controllers/flowers');
var router = express.Router();

router.get('/', flowers_controlers.flowers_view_all_Page );

/* GET detail flowers page */
router.get('/detail', flowers_controlers.flowers_view_one_Page);

/* GET create flowers page */
router.get('/create', flowers_controlers.flowers_create_Page);


router.get('/update', flowers_controlers.flowers_update_Page);

/* GET delete costume page */
router.get('/delete', flowers_controlers.flowers_delete_Page);

module.exports = router;