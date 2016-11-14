var mongoose = require('mongoose');

var strainSchema = mongoose.Schema({
  name: String,
  type: String,
  rating: Number,
  goodEffects: { type: Array, default: [] },
  badEffects: { type: Array, default: [] },
  strainId: Number,
  dataName: String,
  image: String,
  reviewCount: Number,
  dataUrl: String,
  created: { type: Number, default: () => Date.now() },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }

})

module.exports = mongoose.model('Strain', strainSchema);
