// const express = require('express');
// const bodyParser = require('body-parser'); // Middleware for parsing JSON request bodies
// const app = express();
// const port = process.env.PORT || 4000;

// app.use(bodyParser.json()); // Parse JSON request bodies

// // GET endpoint
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// // POST endpoint
// app.post('/post', (req, res) => {
//   const requestData = req.body; // Data sent in the POST request body
//   console.log('requestData>>>>>>>>>>>>', requestData)
//   res.json({ message: 'Received POST data:', data: requestData });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a MongoDB schema and model (e.g., for items)
const itemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model('Item', itemSchema);

// API Endpoints
app.post('/items', async (req, res) => {
  try {
    const newItem = new Item({ name: req.body.name });
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
