import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
// Removed fileURLToPath import as it's not needed for CommonJS
import fs from 'fs';

// Load environment variables
dotenv.config();

// Use CommonJS-compatible __dirname
// __dirname is natively available in CommonJS

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/apothecaryshoppe')
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Define Herb model schema
const herbSchema = new mongoose.Schema({
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
});

// Create text index for searching
herbSchema.index({ 
  name: 'text', 
  scientificName: 'text', 
  description: 'text',
  properties: 'text',
  uses: 'text'
});

const Herb = mongoose.model('Herb', herbSchema);

// Sample herbs data
const herbsData = [
  {
    name: "Lavender",
    scientificName: "Lavandula angustifolia",
    description: "A fragrant herb with purple flowers known for its calming properties.",
    properties: ["Calming", "Antiseptic", "Anti-inflammatory", "Analgesic"],
    uses: ["Anxiety", "Insomnia", "Minor burns", "Headaches", "Skin irritation"],
    preparations: ["Essential oil", "Dried herb", "Tea", "Tincture", "Salve"],
    contraindications: ["Avoid during first trimester of pregnancy", "May interact with sedative medications"]
  },
  {
    name: "Chamomile",
    scientificName: "Matricaria chamomilla",
    description: "A gentle herb with daisy-like flowers that has been used for centuries for its calming and digestive properties.",
    properties: ["Anti-inflammatory", "Antispasmodic", "Mild sedative", "Carminative"],
    uses: ["Insomnia", "Anxiety", "Digestive upset", "Skin inflammation", "Colic in children"],
    preparations: ["Tea", "Tincture", "Essential oil", "Bath", "Compress"],
    contraindications: ["Allergy to plants in the Asteraceae family", "May interact with blood thinners"]
  },
  {
    name: "Echinacea",
    scientificName: "Echinacea purpurea",
    description: "A popular immune-boosting herb with distinctive purple coneflowers.",
    properties: ["Immunostimulant", "Antimicrobial", "Anti-inflammatory", "Lymphatic"],
    uses: ["Common cold", "Flu prevention", "Upper respiratory infections", "Wound healing"],
    preparations: ["Tincture", "Capsules", "Tea", "Fresh plant extract"],
    contraindications: ["Autoimmune disorders", "Progressive systemic diseases", "May interfere with immunosuppressant medications"]
  },
  {
    name: "Peppermint",
    scientificName: "Mentha piperita",
    description: "A cooling and refreshing herb used for digestive issues and respiratory conditions.",
    properties: ["Carminative", "Antispasmodic", "Antimicrobial", "Decongestant"],
    uses: ["Digestive upset", "IBS", "Headaches", "Congestion", "Muscle pain"],
    preparations: ["Tea", "Essential oil", "Tincture", "Capsules", "Balm"],
    contraindications: ["GERD/acid reflux", "Hiatal hernia", "Avoid strong preparations with small children"]
  },
  {
    name: "Ginger",
    scientificName: "Zingiber officinale",
    description: "A warming spice and medicinal herb used to aid digestion and reduce inflammation.",
    properties: ["Anti-inflammatory", "Antiemetic", "Carminative", "Circulatory stimulant"],
    uses: ["Nausea", "Motion sickness", "Digestive aid", "Joint pain", "Cold/flu support"],
    preparations: ["Fresh root", "Dried powder", "Tea", "Tincture", "Compress"],
    contraindications: ["May interact with blood thinners", "Use caution with gallstones", "May affect blood sugar levels"]
  }
];

// Seed the database
const seedDatabase = async () => {
  try {
    // Clear the existing database
    await Herb.deleteMany({});
    console.log('Database cleared');

    // Insert new herb data
    const herbs = await Herb.insertMany(herbsData);
    console.log(`${herbs.length} herbs inserted`);

    // Create a directory for herb data
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Save the herb data to a JSON file for future reference
    fs.writeFileSync(
      path.join(dataDir, 'herbs.json'),
      JSON.stringify(herbs, null, 2)
    );
    console.log('Herb data saved to file');

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seeding function
seedDatabase();