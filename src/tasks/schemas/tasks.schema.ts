import { Schema } from 'mongoose';

export const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: {
    type: String,
    enum: ['todo', 'in_progress', 'completed'],
    default: 'todo',
  },
  assignedTo: { type: String, required: false },
});
