import { Schema, model, Document, Types } from 'mongoose';

export interface IUserCollection extends Document {
  user: Types.ObjectId;
  herbs: Types.ObjectId[];
  remedies: Types.ObjectId[];
}

const userCollectionSchema = new Schema<IUserCollection>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  herbs: [{ type: Schema.Types.ObjectId, ref: 'Herb' }],
  remedies: [{ type: Schema.Types.ObjectId, ref: 'Remedy' }],
});

const UserCollection = model<IUserCollection>('UserCollection', userCollectionSchema);
export default UserCollection;
