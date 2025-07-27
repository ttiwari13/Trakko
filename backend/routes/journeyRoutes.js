import express from 'express';
import journeyController from '../controllers/journeyController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/start', protect, journeyController.startJourney);
router.put('/:id/add-point', protect, journeyController.addRoutePoint);
router.put('/:id/end', protect, journeyController.endJourney);
router.get('/', protect, journeyController.getAllJourneys);

export default router;
