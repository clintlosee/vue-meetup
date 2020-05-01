const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
  image: String,
});

module.exports = mongoose.model('Category', categorySchema);
