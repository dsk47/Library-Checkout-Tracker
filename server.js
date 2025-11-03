const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const Borrow = require('./models/Borrow');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Get all borrowed books
app.get('/api/borrows', async (req, res) => {
  const borrows = await Borrow.find().sort({ borrowedAt: -1 });
  res.json(borrows);
});

// Add new borrow record
app.post('/api/borrows', async (req, res) => {
  const { bookTitle, borrowerName } = req.body;
  const borrow = new Borrow({ bookTitle, borrowerName });
  await borrow.save();
  res.json({ message: 'Borrow record added!' });
});

// Delete (mark as returned)
app.delete('/api/borrows/:id', async (req, res) => {
  await Borrow.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book marked as returned' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
