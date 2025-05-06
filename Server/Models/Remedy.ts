import { Schema, model, Document, Types } from 'mongoose';

export interface IRemedy extends Document {
  title: string;
  description?: string;
  herbs: Types.ObjectId[];
  instructions?: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
}

const remedySchema = new Schema<IRemedy>({
  title: { type: String, required: true },
  description: { type: String },
  herbs: [{ type: Schema.Types.ObjectId, ref: 'Herb' }],
  instructions: { type: String },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Remedy = model<IRemedy>('Remedy', remedySchema);
export default Remedy;