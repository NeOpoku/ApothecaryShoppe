import { Request, Response } from 'express';
import Herb from '../Models/Herb';
import { searchHerbs, getHerbDetails, getHerbRecommendations } from '../Service/openai';

/**
 * Search for herbs using OpenAI and cached database entries
 */
export const searchHerbsController = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // First check if we have matching herbs in our database
    const cachedHerbs = await Herb.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
    .sort({ score: { $meta: "textScore" } })
    .limit(5);

    // If we have sufficient results, return them
    if (cachedHerbs.length >= 3) {
      return res.json({ 
        source: 'database',
        herbs: cachedHerbs 
      });
    }

    // Otherwise, query OpenAI
    const openAiResponse = await searchHerbs(query as string);
    
    // Parse the response (it's already in JSON format)
    const herbData = JSON.parse(openAiResponse);
    
    // Store new herb data in the database for future use if it contains herbs
    if (herbData.herbs && Array.isArray(herbData.herbs)) {
      for (const herb of herbData.herbs) {
        // Check if herb already exists
        const existingHerb = await Herb.findOne({ name: herb.name });
        if (!existingHerb && herb.name && herb.description) {
          await Herb.create({
            name: herb.name,
            scientificName: herb.scientificName || '',
            description: herb.description || '',
            properties: herb.properties || [],
            uses: herb.uses || [],
            preparations: herb.preparations || [],
            contraindications: herb.contraindications || []
          });
        }
      }
    }

    return res.json({
      source: 'openai',
      ...herbData
    });

  } catch (error) {
    console.error('Error searching herbs:', error);
    return res.status(500).json({ message: 'Error searching herbs' });
  }
};

/**
 * Get detailed information about a specific herb
 */
export const getHerbDetailsController = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    
    if (!name) {
      return res.status(400).json({ message: 'Herb name is required' });
    }

    // First check if we have this herb in our database
    const cachedHerb = await Herb.findOne({ 
      $or: [
        { name: new RegExp(name, 'i') },
        { scientificName: new RegExp(name, 'i') }
      ] 
    });

    // If we have it, return it
    if (cachedHerb) {
      return res.json({ 
        source: 'database',
        herb: cachedHerb 
      });
    }

    // Otherwise, query OpenAI
    const openAiResponse = await getHerbDetails(name);
    
    // Parse the response
    const herbData = JSON.parse(openAiResponse);
    
    // Store new herb data in the database for future use
    if (herbData.herb && herbData.herb.name) {
      const herb = herbData.herb;
      await Herb.create({
        name: herb.name,
        scientificName: herb.scientificName || '',
        description: herb.description || '',
        properties: herb.properties || [],
        uses: herb.uses || [],
        preparations: herb.preparations || [],
        contraindications: herb.contraindications || []
      });
    }

    return res.json({
      source: 'openai',
      ...herbData
    });

  } catch (error) {
    console.error(`Error getting herb details for ${req.params.name}:`, error);
    return res.status(500).json({ message: 'Error getting herb details' });
  }
};

/**
 * Get herb recommendations for a specific purpose
 */
export const getHerbRecommendationsController = async (req: Request, res: Response) => {
  try {
    const { purpose } = req.query;
    
    if (!purpose || typeof purpose !== 'string') {
      return res.status(400).json({ message: 'Purpose is required' });
    }

    // Query OpenAI for recommendations
    const openAiResponse = await getHerbRecommendations(purpose as string);
    
    // Parse the response
    const recommendationsData = JSON.parse(openAiResponse);
    
    // Store any new herbs in the database
    if (recommendationsData.herbs && Array.isArray(recommendationsData.herbs)) {
      for (const herb of recommendationsData.herbs) {
        // Only store if we have sufficient data
        if (herb.name && herb.description) {
          // Check if herb already exists
          const existingHerb = await Herb.findOne({ name: herb.name });
          if (!existingHerb) {
            await Herb.create({
              name: herb.name,
              scientificName: herb.scientificName || '',
              description: herb.description || '',
              properties: herb.properties || [],
              uses: herb.uses || [],
              preparations: herb.preparations || [],
              contraindications: herb.contraindications || []
            });
          }
        }
      }
    }

    return res.json(recommendationsData);

  } catch (error) {
    console.error(`Error getting herb recommendations for ${req.query.purpose}:`, error);
    return res.status(500).json({ message: 'Error getting herb recommendations' });
  }
};

/**
 * List all herbs in the database
 */
export const listHerbsController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    
    const herbs = await Herb.find()
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Herb.countDocuments();
    
    return res.json({
      herbs,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error listing herbs:', error);
    return res.status(500).json({ message: 'Error listing herbs' });
  }
};