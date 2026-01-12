const express = require('express');
const router = express.Router();
const passengerController = require('../controllers/passengerController');

router.get('/', passengerController.getAllPassengers);
router.get('/:id', passengerController.getPassengerById);
router.post('/', passengerController.createPassenger);
router.put('/:id', passengerController.updatePassenger);
router.delete('/:id', passengerController.deletePassenger);

module.exports = router;