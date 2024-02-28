const express = require('express');

const router = express.Router();

const restaurantController = require('../../controller/restaurant');

router.get('/', restaurantController.readRestaurants);
router.post('/', restaurantController.createRestaurant);

module.exports = router;