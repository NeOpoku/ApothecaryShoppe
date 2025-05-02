import { searchHerbs, getHerbDetails, getHerbRecommendations } from '../Service/openai.js';
import mongoose from 'mongoose';

// Import the Herb model properly
// Using a more robust import approach to avoid TypeScript errors
const Herb = mongoose.models.Herb || mongoose.model('Herb', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  scientificName: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  properties: {
    type: [String],
    default: [],
  },
  uses: {
    type: [String],
    default: [],
  },
  preparations: {
    type: [String],
    default: [],
  },
  contraindications: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
}));

// Define resolver function types to fix TypeScript errors
type ResolverFn = (parent: any, args: any, context: any, info: any) => any;
interface ResolverMap {
  [key: string]: ResolverFn | {
    [key: string]: ResolverFn;
  };
}

export const resolvers = {
  Query: {
    hello: (): string => 'Hello world!',
    
    herbs: async (_: any, { page = 1, limit = 20 }: { page?: number, limit?: number }) => {
      try {
        const skip = (page - 1) * limit;
        
        const herbs = await Herb.find()
          .sort({ name: 1 })
          .skip(skip)
          .limit(limit);
        
        const total = await Herb.countDocuments();
        
        return {
          herbs,
          pagination: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
          }
        };
      } catch (error) {
        console.error('Error fetching herbs:', error);
        throw new Error('Failed to fetch herbs');
      }
    },
    
    searchHerbs: async (_: any, { query }: { query: string }) => {
      try {
        // First check if we have matching herbs in our database
        const cachedHerbs = await Herb.find(
          { $text: { $search: query } },
          { score: { $meta: "textScore" } }
        )
        .sort({ score: { $meta: "textScore" } })
        .limit(5);

        // If we have sufficient results, return them
        if (cachedHerbs.length >= 3) {
          return { 
            source: 'database',
            herbs: cachedHerbs,
            query
          };
        }

        // Otherwise, query OpenAI
        const openAiResponse = await searchHerbs(query);
        
        // Parse the response
        const herbData = JSON.parse(openAiResponse as string);
        
        // Store new herb data in the database for future use
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

        return {
          source: 'openai',
          herbs: herbData.herbs || [],
          query
        };
      } catch (error) {
        console.error('Error searching herbs:', error);
        throw new Error('Failed to search herbs');
      }
    },
    
    herbDetails: async (_: any, { name }: { name: string }) => {
      try {
        // First check if we have this herb in our database
        const cachedHerb = await Herb.findOne({ 
          $or: [
            { name: new RegExp(name, 'i') },
            { scientificName: new RegExp(name, 'i') }
          ] 
        });

        // If we have it, return it
        if (cachedHerb) {
          return { 
            source: 'database',
            herb: cachedHerb 
          };
        }

        // Otherwise, query OpenAI
        const openAiResponse = await getHerbDetails(name);
        
        // Parse the response
        const herbData = JSON.parse(openAiResponse as string);
        
        // Store new herb data in the database for future use
        if (herbData.herb && herbData.herb.name) {
          const herb = herbData.herb;
          const newHerb = await Herb.create({
            name: herb.name,
            scientificName: herb.scientificName || '',
            description: herb.description || '',
            properties: herb.properties || [],
            uses: herb.uses || [],
            preparations: herb.preparations || [],
            contraindications: herb.contraindications || []
          });
          
          return {
            source: 'openai',
            herb: newHerb
          };
        }

        throw new Error(`Herb ${name} not found`);
      } catch (error) {
        console.error(`Error getting herb details for ${name}:`, error);
        throw new Error('Failed to get herb details');
      }
    },
    
    herbRecommendations: async (_: any, { purpose }: { purpose: string }) => {
      try {
        // Query OpenAI for recommendations
        const openAiResponse = await getHerbRecommendations(purpose);
        
        // Parse the response
        const recommendationsData = JSON.parse(openAiResponse as string);
        
        // Process and store any new herbs
        if (recommendationsData.recommendations && Array.isArray(recommendationsData.recommendations)) {
          for (const rec of recommendationsData.recommendations) {
            if (rec.herb && rec.herb.name && rec.herb.description) {
              // Check if herb already exists
              const existingHerb = await Herb.findOne({ name: rec.herb.name });
              if (!existingHerb) {
                const herb = rec.herb;
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

        return {
          purpose,
          recommendations: recommendationsData.recommendations || []
        };
      } catch (error) {
        console.error(`Error getting herb recommendations for ${purpose}:`, error);
        throw new Error('Failed to get herb recommendations');
      }
    }
  }
};