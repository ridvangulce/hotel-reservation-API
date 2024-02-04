const { typeByCity, typeByCount, createHotel, updateHotel, deleteHotel, getSingleHotel, getAllHotel } = require('../controllers/hotel.js');
const express = require('express');


const router = express.Router();


router.get('/typeByCity', typeByCity)
router.get('/typeByCount', typeByCount)
router.post('/createHotel', createHotel)
router.put('/updateHotel/:id', updateHotel)
router.delete('/deleteHotel/:id', deleteHotel)
router.get('/getSingleHotel/:id', getSingleHotel)
router.get('/getAllHotel', getAllHotel)

module.exports = router;