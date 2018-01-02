import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema({
  title: String,
  content: String,
});

const todo = mongoose.model('Post', postSchema);

export default todo;
