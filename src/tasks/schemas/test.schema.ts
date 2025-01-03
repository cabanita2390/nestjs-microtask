import { Schema } from 'mongoose';

export const TestSchema = new Schema({
  name: { type: String, required: true },
});
