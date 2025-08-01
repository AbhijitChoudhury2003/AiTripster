// const express = require('express');
// const Trip = require('../models/Trip');
// const { generateTrip } = require('../services/geminiService');
// const authenticateUser = require('../middleware/auth');

// const router = express.Router();

// router.post('/create', authenticateUser, async (req, res) => {
//   try {
//     console.log('📝 Trip creation request received:', req.body);
    
//     const { destination, days, budget } = req.body;

//     // Detailed validation
//     if (!destination) {
//       return res.status(400).json({
//         success: false,
//         message: 'Destination is required'
//       });
//     }

//     if (!days || days < 1 || days > 30) {
//       return res.status(400).json({
//         success: false,
//         message: 'Days must be between 1 and 30'
//       });
//     }

//     if (!budget) {
//       return res.status(400).json({
//         success: false,
//         message: 'Budget is required'
//       });
//     }

//     console.log(`🚀 Generating trip for ${destination}, ${days} days, ${budget} budget`);
    
//     // Generate AI response
//     const aiResult = await generateTrip(destination, days, budget);
    
//     if (!aiResult.success) {
//       console.error('AI Generation failed:', aiResult.message);
//       return res.status(500).json({
//         success: false,
//         message: 'Failed to generate trip with AI',
//         error: aiResult.message,
//         details: aiResult.details
//       });
//     }

//     // Save to database
//     const trip = new Trip({
//       user: req.user._id,
//       destination,
//       days,
//       budget,
//       aiResponse: aiResult.data
//     });

//     await trip.save();
//     console.log('✅ Trip saved to database');

//     res.status(201).json({
//       success: true,
//       message: 'Amazing trip created successfully!',
//       data: { trip }
//     });

//   } catch (error) {
//     console.error('❌ Trip Creation Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error during trip creation',
//       error: error.message,
//       stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     });
//   }
// });

// module.exports = router;
const express = require('express');
const Trip = require('../models/Trip');
const { generateTrip } = require('../services/geminiService');
const authenticateUser = require('../middleware/auth');

const router = express.Router();

// Create trip with AI - Fixed response structure
router.post('/create', authenticateUser, async (req, res) => {
  try {
    console.log('📝 Trip creation request received:', req.body);
    console.log('👤 User:', req.user.name);

    const { destination, days, budget } = req.body;

    // Detailed validation
    if (!destination || !days || !budget) {
      return res.status(400).json({
        success: false,
        message: 'Destination, days, and budget are required'
      });
    }

    console.log(`🚀 Generating AI trip for ${destination}, ${days} days, ${budget} budget`);

    // Generate AI response
    const aiResult = await generateTrip(destination, days, budget);
    
    if (!aiResult.success) {
      console.error('❌ AI Generation failed:', aiResult.message);
      return res.status(500).json({
        success: false,
        message: 'Failed to generate trip with AI: ' + aiResult.message
      });
    }

    console.log('✅ AI trip generated successfully');

    // Save to database
    const newTrip = new Trip({
      user: req.user._id,
      destination,
      days: parseInt(days),
      budget,
      aiResponse: aiResult.data
    });

    await newTrip.save();
    console.log('✅ Trip saved to database with ID:', newTrip._id);

    // CRITICAL: Return consistent response structure
    res.status(201).json({
      success: true,
      message: 'Trip created successfully!',
      data: {
        tripId: newTrip._id.toString(), // Ensure string format
        trip: {
          id: newTrip._id,
          destination: newTrip.destination,
          days: newTrip.days,
          budget: newTrip.budget,
          createdAt: newTrip.createdAt
        }
      }
    });

  } catch (error) {
    console.error('❌ Trip Creation Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during trip creation: ' + error.message
    });
  }
});

// Get specific trip details - Fixed for trip results page
router.get('/:tripId', authenticateUser, async (req, res) => {
  try {
    console.log('📖 Fetching trip details for ID:', req.params.tripId);

    const trip = await Trip.findOne({
      _id: req.params.tripId,
      user: req.user._id
    });

    if (!trip) {
      console.log('❌ Trip not found for ID:', req.params.tripId);
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    console.log('✅ Trip found:', trip.destination);

    res.json({
      success: true,
      message: 'Trip details retrieved successfully',
      data: {
        trip: trip
      }
    });

  } catch (error) {
    console.error('❌ Error fetching trip:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving trip details: ' + error.message
    });
  }
});

// Get user's trips - Simple list
router.get('/my-trips', authenticateUser, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user._id })
      .select('destination days budget createdAt')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      message: 'Trips retrieved successfully',
      data: {
        trips,
        count: trips.length
      }
    });

  } catch (error) {
    console.error('❌ Error fetching trips:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving trips: ' + error.message
    });
  }
});

module.exports = router;
