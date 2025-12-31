// routes/destinationRoutes.js
import express from 'express';
import Destination from '../models/Destination.js';

const router = express.Router();

// Get all destinations
router.get('/', async (req, res) => {
  try {
    const { region, limit, sort } = req.query;
    const query = { isActive: true };
    
    if (region) {
      query.region = region;
    }
    
    const destinations = await Destination.find(query)
      .limit(parseInt(limit) || 20)
      .sort(sort || 'order');
    
    res.json({
      success: true,
      count: destinations.length,
      data: destinations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get single destination by slug
router.get('/:slug', async (req, res) => {
  try {
    const destination = await Destination.findOne({ 
      slug: req.params.slug,
      isActive: true 
    });
    
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }
    
    res.json({
      success: true,
      data: destination
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Create new destination (admin)
router.post('/', async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    
    res.status(201).json({
      success: true,
      data: destination
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating destination',
      error: error.message
    });
  }
});

// Update destination (admin)
router.put('/:id', async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }
    
    res.json({
      success: true,
      data: destination
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating destination',
      error: error.message
    });
  }
});

// Delete destination (admin)
router.delete('/:id', async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Destination deactivated'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Get destinations by region with stats
router.get('/regions/stats', async (req, res) => {
  try {
    const stats = await Destination.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$region',
          count: { $sum: 1 },
          totalTours: { $sum: '$tourCount' },
          destinations: { 
            $push: {
              title: '$title',
              slug: '$slug',
              image: '$mainImage',
              tourCount: '$tourCount'
            }
          }
        }
      },
      {
        $project: {
          region: '$_id',
          count: 1,
          totalTours: 1,
          destinations: 1,
          _id: 0
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error
    });
  }
});

export default router;