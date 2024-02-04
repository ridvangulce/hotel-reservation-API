const { getAllRoom, getDetailRoom, updateRoom, createRoom, deleteRoom } = require('../controllers/room.js');
const express = require('express');

const router = express.Router();

router.get('/getAllRoom', getAllRoom)
router.get('/getDetailRoom/:id', getDetailRoom)
router.put('/updateRoom/:id', updateRoom)
router.post('/createRoom/:id/:hotelid', createRoom)
router.delete('/deleteRoom/:id/:hotelid', deleteRoom)




module.exports = router;

