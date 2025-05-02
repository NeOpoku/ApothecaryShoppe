import mongoose, { Document, Schema } from 'mongoose';

export interface IHerb extends Document {
  name: string;
  scientificName: string;
  description: string;
  properties: string[];
  uses: string[];
  preparations: string[];
  contraindications: string[];
  createdAt: Date;
  updatedAt: Date;
}

const HerbSchema: Schema = new Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

// Create text index for searching
HerbSchema.index({ 
  name: 'text', 
  scientificName: 'text', 
  description: 'text',
  properties: 'text',
  uses: 'text'
});

// Check if the model already exists to prevent OverwriteModelError
const Herb = mongoose.models.Herb || mongoose.model<IHerb>('Herb', HerbSchema);

export default Herb;