// src/services/openaiService.ts
import { Ailment, Herb, Remedy } from '../types';

// Mock herb database - in a real application, this would come from a backend
const herbDatabase: Herb[] = [
  {
    id: '1',
    name: 'Chamomile',
    scientificName: 'Matricaria chamomilla',
    description: 'A gentle herb with calming properties. Commonly used in teas.',
    uses: ['Sleep aid', 'Digestive support', 'Stress relief', 'Skin inflammation'],
    benefits: ['Calming', 'Anti-inflammatory', 'Digestive support'],
    imageUrl: '/assets/images/herbs/chamomile.jpg',
  },
  {
    id: '2',
    name: 'Lavender',
    scientificName: 'Lavandula angustifolia',
    description: 'Known for its soothing fragrance and relaxing properties.',
    uses: ['Anxiety relief', 'Sleep improvement', 'Headache relief', 'Skin care'],
    benefits: ['Relaxation', 'Stress reduction', 'Antimicrobial'],
    imageUrl: '/assets/images/herbs/lavender.jpg',
  },
  {
    id: '3',
    name: 'Peppermint',
    scientificName: 'Mentha piperita',
    description: 'A refreshing herb that provides digestive support and mental clarity.',
    uses: ['Digestive aid', 'Headache relief', 'Breath freshener', 'Focus enhancement'],
    benefits: ['Digestive support', 'Pain relief', 'Mental clarity'],
    imageUrl: '/assets/images/herbs/peppermint.jpg',
  },
  {
    id: '4',
    name: 'Echinacea',
    scientificName: 'Echinacea purpurea',
    description: 'A powerful herb that supports the immune system.',
    uses: ['Immune support', 'Cold and flu prevention', 'Wound healing'],
    benefits: ['Immune boosting', 'Anti-inflammatory', 'Antiviral'],
    imageUrl: '/assets/images/herbs/echinacea.jpg',
  },
  {
    id: '5',
    name: 'Ginger',
    scientificName: 'Zingiber officinale',
    description: 'A warming herb with powerful anti-inflammatory and digestive properties.',
    uses: ['Nausea relief', 'Digestive aid', 'Pain reduction', 'Circulation improvement'],
    benefits: ['Anti-inflammatory', 'Digestive support', 'Immune boosting'],
    imageUrl: '/assets/images/herbs/ginger.jpg',
  },
  {
    id: '6',
    name: 'Valerian',
    scientificName: 'Valeriana officinalis',
    description: 'A potent herb used primarily for sleep and anxiety.',
    uses: ['Sleep aid', 'Anxiety relief', 'Stress reduction'],
    benefits: ['Sedative', 'Calming', 'Sleep quality improvement'],
    imageUrl: '/assets/images/herbs/valerian.jpg',
  },
  {
    id: '7',
    name: 'Turmeric',
    scientificName: 'Curcuma longa',
    description: 'A golden spice with powerful anti-inflammatory properties.',
    uses: ['Joint pain relief', 'Inflammation reduction', 'Digestive support', 'Skin health'],
    benefits: ['Anti-inflammatory', 'Antioxidant', 'Digestive aid'],
    imageUrl: '/assets/images/herbs/turmeric.jpg',
  },
  {
    id: '8',
    name: 'Lemon Balm',
    scientificName: 'Melissa officinalis',
    description: 'A lemon-scented herb that promotes relaxation and mental clarity.',
    uses: ['Anxiety relief', 'Sleep improvement', 'Focus enhancement', 'Digestive aid'],
    benefits: ['Calming', 'Antiviral', 'Cognitive support'],
    imageUrl: '/assets/images/herbs/lemon-balm.jpg',
  },
  {
    id: '9',
    name: 'Elderberry',
    scientificName: 'Sambucus nigra',
    description: 'A berry known for its immune-supporting properties.',
    uses: ['Immune support', 'Cold and flu prevention', 'Antioxidant boost'],
    benefits: ['Immune boosting', 'Antiviral', 'Rich in vitamins'],
    imageUrl: '/assets/images/herbs/elderberry.jpg',
  },
  {
    id: '10',
    name: 'Dandelion',
    scientificName: 'Taraxacum officinale',
    description: 'A common weed with powerful detoxifying properties.',
    uses: ['Liver support', 'Digestion aid', 'Skin health', 'Detoxification'],
    benefits: ['Detoxifying', 'Diuretic', 'Liver support'],
    imageUrl: '/assets/images/herbs/dandelion.jpg',
  },
  {
    id: '11',
    name: 'Holy Basil (Tulsi)',
    scientificName: 'Ocimum sanctum',
    description: 'An adaptogenic herb that helps the body respond to stress.',
    uses: ['Stress management', 'Immune support', 'Energy balance', 'Mental clarity'],
    benefits: ['Adaptogenic', 'Anti-inflammatory', 'Antioxidant'],
    imageUrl: '/assets/images/herbs/holy-basil.jpg',
  },
  {
    id: '12',
    name: 'Calendula',
    scientificName: 'Calendula officinalis',
    description: 'A bright flower with skin-healing properties.',
    uses: ['Skin healing', 'Wound treatment', 'Inflammation reduction'],
    benefits: ['Anti-inflammatory', 'Antimicrobial', 'Skin repair'],
    imageUrl: '/assets/images/herbs/calendula.jpg',
  }
];

// Mock remedy database
const remedyDatabase: Remedy[] = [
  {
    id: '1',
    title: 'Calming Sleep Tea',
    description: 'A gentle blend to promote restful sleep and relaxation.',
    ailment: 'Insomnia',
    herbs: [
      herbDatabase.find(h => h.name === 'Chamomile')!,
      herbDatabase.find(h => h.name === 'Lavender')!,
      herbDatabase.find(h => h.name === 'Valerian')!
    ],
    instructions: 'Steep 1 teaspoon of each herb in hot water for 5-7 minutes. Drink 30 minutes before bedtime.',
    imageUrl: '/assets/images/remedies/sleep-tea.jpg',
  },
  {
    id: '2',
    title: 'Digestive Support Blend',
    description: 'A soothing blend to ease digestive discomfort and support gut health.',
    ailment: 'Digestive issues',
    herbs: [
      herbDatabase.find(h => h.name === 'Peppermint')!,
      herbDatabase.find(h => h.name === 'Ginger')!,
      herbDatabase.find(h => h.name === 'Chamomile')!
    ],
    instructions: 'Combine equal parts of each herb. Steep 1 tablespoon in hot water for 5-10 minutes. Drink after meals.',
    imageUrl: '/assets/images/remedies/digestive-blend.jpg',
  },
  {
    id: '3',
    title: 'Immune Boost Tincture',
    description: 'A powerful blend to strengthen the immune system and fight off colds.',
    ailment: 'Cold and flu',
    herbs: [
      herbDatabase.find(h => h.name === 'Elderberry')!,
      herbDatabase.find(h => h.name === 'Echinacea')!,
      herbDatabase.find(h => h.name === 'Ginger')!
    ],
    instructions: 'Take 1/2 teaspoon of the tincture three times daily at the first sign of illness.',
    imageUrl: '/assets/images/remedies/immune-tincture.jpg',
  },
  {
    id: '4',
    title: 'Stress Relief Elixir',
    description: 'A calming blend to reduce stress and promote a sense of well-being.',
    ailment: 'Stress and anxiety',
    herbs: [
      herbDatabase.find(h => h.name === 'Holy Basil (Tulsi)')!,
      herbDatabase.find(h => h.name === 'Lemon Balm')!,
      herbDatabase.find(h => h.name === 'Lavender')!
    ],
    instructions: 'Combine equal parts of each herb. Steep 1 tablespoon in hot water for 10 minutes. Drink throughout the day.',
    imageUrl: '/assets/images/remedies/stress-elixir.jpg',
  },
  {
    id: '5',
    title: 'Anti-Inflammatory Blend',
    description: 'A powerful blend to reduce inflammation and ease joint pain.',
    ailment: 'Inflammation and pain',
    herbs: [
      herbDatabase.find(h => h.name === 'Turmeric')!,
      herbDatabase.find(h => h.name === 'Ginger')!,
      herbDatabase.find(h => h.name === 'Holy Basil (Tulsi)')!
    ],
    instructions: 'Mix 1 teaspoon turmeric and 1/2 teaspoon each of ginger and holy basil with warm water or milk. Add honey to taste. Drink 1-2 times daily.',
    imageUrl: '/assets/images/remedies/anti-inflammatory.jpg',
  }
];

// Ailment to herb mapping
const ailmentToHerbsMap: Record<string, string[]> = {
  'insomnia': ['Chamomile', 'Lavender', 'Valerian', 'Lemon Balm'],
  'anxiety': ['Lavender', 'Lemon Balm', 'Holy Basil (Tulsi)', 'Chamomile'],
  'stress': ['Holy Basil (Tulsi)', 'Lavender', 'Lemon Balm', 'Chamomile'],
  'headache': ['Peppermint', 'Lavender', 'Ginger', 'Lemon Balm'],
  'migraine': ['Peppermint', 'Lavender', 'Ginger', 'Feverfew'],
  'nausea': ['Ginger', 'Peppermint', 'Chamomile'],
  'digestive issues': ['Peppermint', 'Ginger', 'Chamomile', 'Dandelion'],
  'cold': ['Elderberry', 'Echinacea', 'Ginger', 'Peppermint'],
  'flu': ['Elderberry', 'Echinacea', 'Ginger', 'Lemon Balm'],
  'sore throat': ['Elderberry', 'Echinacea', 'Sage', 'Licorice'],
  'inflammation': ['Turmeric', 'Ginger', 'Holy Basil (Tulsi)', 'Calendula'],
  'joint pain': ['Turmeric', 'Ginger', 'Devil\'s Claw', 'Boswellia'],
  'skin issues': ['Calendula', 'Chamomile', 'Lavender', 'Aloe Vera'],
  'fatigue': ['Holy Basil (Tulsi)', 'Ginseng', 'Ashwagandha', 'Rhodiola'],
  'allergies': ['Nettle', 'Quercetin', 'Butterbur', 'Elderberry'],
};

// Function to get herbs for an ailment
const getHerbsForAilment = (ailment: string): Herb[] => {
  const normalizedAilment = ailment.toLowerCase();
  
  // Find matching ailment keys
  const matchingAilments = Object.keys(ailmentToHerbsMap).filter(key => 
    normalizedAilment.includes(key) || key.includes(normalizedAilment)
  );
  
  if (matchingAilments.length === 0) {
    // If no direct match, try to find partial matches
    const partialMatches = Object.keys(ailmentToHerbsMap).filter(key => {
      const keyWords = key.split(' ');
      const ailmentWords = normalizedAilment.split(' ');
      return keyWords.some(word => ailmentWords.some(ailmentWord => 
        ailmentWord.includes(word) || word.includes(ailmentWord)
      ));
    });
    
    matchingAilments.push(...partialMatches);
  }
  
  // Get unique herb names from all matching ailments
  const herbNames = Array.from(new Set(
    matchingAilments.flatMap(ailment => ailmentToHerbsMap[ailment])
  ));
  
  // If still no herbs found, return some default herbs
  if (herbNames.length === 0) {
    return [
      herbDatabase.find(h => h.name === 'Chamomile')!,
      herbDatabase.find(h => h.name === 'Lavender')!,
      herbDatabase.find(h => h.name === 'Ginger')!,
    ];
  }
  
  // Get herb objects from database
  return herbNames
    .map(name => herbDatabase.find(h => h.name === name))
    .filter((herb): herb is Herb => herb !== undefined);
};

// Function to get remedies for an ailment
const getRemediesForAilment = (ailment: string): Remedy[] => {
  const normalizedAilment = ailment.toLowerCase();
  
  // Find matching remedies
  return remedyDatabase.filter(remedy => 
    remedy.ailment.toLowerCase().includes(normalizedAilment) || 
    normalizedAilment.includes(remedy.ailment.toLowerCase())
  );
};

// Main function to get herbal recommendations for an ailment
export const getHerbalRecommendations = async (ailment: string): Promise<Ailment> => {
  // In a real app, this would call the OpenAI API
  // For this demo, we'll use our mock databases

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const recommendedHerbs = getHerbsForAilment(ailment);
  const recommendedRemedies = getRemediesForAilment(ailment);
  
  return {
    name: ailment,
    description: `Herbal recommendations for ${ailment}`,
    recommendedHerbs,
  };
};

// Function to search for herbs by name
export const searchHerbs = async (query: string): Promise<Herb[]> => {
  const normalizedQuery = query.toLowerCase();
  
  return herbDatabase.filter(herb => 
    herb.name.toLowerCase().includes(normalizedQuery) ||
    herb.scientificName.toLowerCase().includes(normalizedQuery) ||
    herb.uses.some(use => use.toLowerCase().includes(normalizedQuery)) ||
    herb.benefits.some(benefit => benefit.toLowerCase().includes(normalizedQuery))
  );
};

// Function to search for remedies by name or ailment
export const searchRemedies = async (query: string): Promise<Remedy[]> => {
  const normalizedQuery = query.toLowerCase();
  
  return remedyDatabase.filter(remedy => 
    remedy.title.toLowerCase().includes(normalizedQuery) ||
    remedy.description.toLowerCase().includes(normalizedQuery) ||
    remedy.ailment.toLowerCase().includes(normalizedQuery)
  );
};