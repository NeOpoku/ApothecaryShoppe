// src/Models/Herb.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IHerb extends Document {
  name: string;
  scientificName: string;
  description: string;
  benefits: string[];
  sideEffects: string[];
  dosage: string;
  imageUrl?: string;
  category: string;
  origin: string;
  price: number;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const herbSchema = new Schema<IHerb>({
  name: {
    type: String,
    required: [true, 'Herb name is required'],
    trim: true,
    unique: true
  },
  scientificName: {
    type: String,
    required: [true, 'Scientific name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  benefits: [{
    type: String,
    required: [true, 'At least one benefit is required']
  }],
  sideEffects: [{
    type: String
  }],
  dosage: {
    type: String,
    required: [true, 'Dosage information is required']
  },
  imageUrl: {
    type: String
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['adaptogen', 'tonic', 'nervine', 'bitter', 'antioxidant', 'diuretic', 'antimicrobial', 'other']
  },
  origin: {
    type: String,
    required: [true, 'Origin is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  stockQuantity: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock quantity cannot be negative'],
    default: 0
  }
}, {
  timestamps: true
});

// Add text index for search functionality
herbSchema.index({ 
  name: 'text', 
  scientificName: 'text', 
  description: 'text', 
  category: 'text' 
});

const Herb = mongoose.model<IHerb>('Herb', herbSchema);

export default Herb;