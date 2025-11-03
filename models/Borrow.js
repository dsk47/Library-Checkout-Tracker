const mongoose = require('mongoose');

const BorrowSchema = new mongoose.Schema({
  bookTitle: { type: String, required: true },
  borrowerName: { type: String, required: true },
  borrowedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Borrow', BorrowSchema);
