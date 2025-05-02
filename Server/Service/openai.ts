import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Search for herbs using OpenAI API
 * @param query Search query about herbs
 * @returns OpenAI API response with herb information
 */
export const searchHerbs = async (query: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable herbalist assistant. Provide accurate information about herbs, their properties, uses in apothecary, and traditional medicinal applications. Format your responses to be easily parsed as JSON."
        },
        { 
          role: "user", 
          content: query 
        }
      ],
      response_format: { type: "json_object" },
    });

    return completion.choices[0].message.content || '{"herbs":[]}';
  } catch (error) {
    console.error('Error querying OpenAI:', error);
    throw new Error('Failed to search herbs');
  }
};

/**
 * Get detailed information about a specific herb
 * @param herbName Name of the herb
 * @returns Detailed information about the herb
 */
export const getHerbDetails = async (herbName: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable herbalist assistant. Provide detailed information about the specified herb including its scientific name, properties, medicinal uses, preparation methods, contraindications, and historical background. Format your response as JSON."
        },
        { 
          role: "user", 
          content: `Provide detailed information about ${herbName}` 
        }
      ],
      response_format: { type: "json_object" },
    });

    return completion.choices[0].message.content || '{"herb":{"name":"Unknown","description":"No information available"}}';
  } catch (error) {
    console.error('Error querying OpenAI:', error);
    throw new Error(`Failed to get details for herb: ${herbName}`);
  }
};

/**
 * Get herb recommendations based on specific conditions or purposes
 * @param purpose The condition or purpose for which herbs are needed
 * @returns List of recommended herbs
 */
export const getHerbRecommendations = async (purpose: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable herbalist assistant. Provide a list of herbs that are traditionally used for the specified condition or purpose. Include brief descriptions of why each herb is suitable. Format your response as JSON."
        },
        { 
          role: "user", 
          content: `What herbs would you recommend for ${purpose}?` 
        }
      ],
      response_format: { type: "json_object" },
    });

    return completion.choices[0].message.content || '{"recommendations":[]}';
  } catch (error) {
    console.error('Error querying OpenAI:', error);
    throw new Error(`Failed to get herb recommendations for: ${purpose}`);
  }
};