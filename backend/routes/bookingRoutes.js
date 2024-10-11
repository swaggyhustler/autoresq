import express from 'express';
import { bookMechanic, deleteRequest, getBookings, getRequests, modifyStatus } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/book', bookMechanic);
router.get('/bookings/:user_id', getBookings);
router.get('/requests/:mech_id', getRequests);
router.patch('/booking/status', modifyStatus);
router.delete('/booking/:booking_id', deleteRequest);

export default router;