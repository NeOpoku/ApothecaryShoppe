import { Schema, model, Document } from 'mongoose';

export interface IHerb extends Document {
  name: string;
  description?: string;
  use: string[];
  image?: string;
}

const herbSchema = new Schema<IHerb>({
  name: { type: String, required: true },
  description: { type: String },
  use: [{ type: String }],
  image: { type: String },
});

const Herb = model<IHerb>('Herb', herbSchema);
export default Herb;