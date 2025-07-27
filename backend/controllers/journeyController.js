const Journey=require('../models/journey');

const startJourney= async (req,res)=>{
    try{
       const {startLocation} = req.body;
    const newJourney= new Journey({
        user:req.user.id,
        startLocation,
        startedAt: new Date(),
        route:[{
            lat:startLocation.lat,
            lng:startLocation.lng,
        },],
    });
    const savedJourney = await newJourney.save();
    res.status(201).json(savedJourney);
    }
    catch(error){
       console.error('Error starting journey:', error);
      res.status(500).json({ message: 'Server error while starting journey' });
    }
};
//add route point for tracking live
const addRoutePoints = async (req, res) => {
  try {
    const { journeyId } = req.params;
    const { points } = req.body; // Expecting array of { lat, lng }

    if (!points || !Array.isArray(points)) {
      return res.status(400).json({ message: 'Points must be an array of coordinates' });
    }

    const journey = await Journey.findById(journeyId);
    if (!journey) {
      return res.status(404).json({ message: 'Journey not found' });
    }

    const newPoints = points.map(({ lat, lng }) => ({
      lat,
      lng,
      timestamp: new Date(),
    }));

    journey.route.push(...newPoints);
    await journey.save();

    res.status(200).json({ message: 'Route points added', journey });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add points', error: error.message });
  }
};

//end location
const endJourney = async (req, res) => {
  try {
    const { endLocation } = req.body;
    const journey = await Journey.findById(req.params.id);

    if (!journey) {
      return res.status(404).json({ message: 'Journey not found' });
    }

    if (journey.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    journey.endLocation = endLocation;
    journey.endedAt = new Date();
    await journey.save();

    res.status(200).json(journey);
  } catch (error) {
    console.error('Error ending journey:', error);
    res.status(500).json({ message: 'Server error while ending journey' });
  }
};
// Get all journeys for logged-in user
const getAllJourneys = async (req, res) => {
  try {
    const journeys = await Journey.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(journeys);
  } catch (error) {
    console.error('Error fetching journeys:', error);
    res.status(500).json({ message: 'Server error while fetching journeys' });
  }
};

export default {
  startJourney,
  addRoutePoints,
  endJourney,
  getAllJourneys,
};