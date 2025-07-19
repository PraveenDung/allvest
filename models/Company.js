const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  stockPrice: { type: Number, required: true },
  availableQuantity: { type: Number, required: true },
});

module.exports = mongoose.model('Company', companySchema);
