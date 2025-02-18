const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'teachers' } // Relación con profesores
});

module.exports = mongoose.model('Course', courseSchema);
