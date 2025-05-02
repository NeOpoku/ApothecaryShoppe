import express from 'express';
import { 
  searchHerbsController,
  getHerbDetailsController,
  getHerbRecommendationsController,
  listHerbsController
} from '../Controllers/herbcontroller';

const router = express.Router();

/**
 * @route   GET /api/herbs/search
 * @desc    Search for herbs
 * @access  Public
 */
router.get('/search', searchHerbsController);

/**
 * @route   GET /api/herbs/details/:name
 * @desc    Get detailed information about a specific herb
 * @access  Public
 */
router.get('/details/:name', getHerbDetailsController);

/**
 * @route   GET /api/herbs/recommendations
 * @desc    Get herb recommendations for a specific purpose
 * @access  Public
 */
router.get('/recommendations', getHerbRecommendationsController);

/**
 * @route   GET /api/herbs
 * @desc    List all herbs in the database
 * @access  Public
 */
router.get('/', listHerbsController);

export default router;