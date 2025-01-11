const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas
mongoose.connect(
  'mongodb+srv://admin:zhKjGJvVnskDLWHr@products.t6t17.mongodb.net/products?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Product Schema
const productSchema = new mongoose.Schema({
  id: String,
  name: String,
  category: String,
  type: String,
  gender: String,
  price: Number,
  originPrice: Number,
  description: String,
  new: Boolean,
  sale: Boolean,
  rate: Number,
  quantity: Number,
  originalprice: Number,
  brand: String,
  sold: Number,
  quantityPurchase: Number,
  images: [String],
  thumbImage: [String],
  action: String,
  slug: String,
  sizes: [Array],
  variation: [
    {
      color: String,
      colorCode: String,
      colorImage: String,
      image: String,
    },
  ],
});

// Feedback Schema (Updated to reflect the fields)
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,      // Adding email field as well
  title: String,
  address: String,
  description : String,
  star: Number,
  date: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);
const Feedback = mongoose.model('Review', feedbackSchema);

// API Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
});

// API Route to fetch feedbacks
app.get('/api/reviews', async (req, res) => {
  try {
    const feedbacks = await Feedback.find(); // Fetch all feedbacks
    const transformedFeedbacks = feedbacks.map(feedback => ({
      id: feedback._id,               // Map _id to id
      customerName: feedback.name,    // Name of the customer
      address: feedback.address,      // Customer's address
      date: feedback.date,            // Date of review
      title: feedback.title,          // Title of the feedback
      comment: feedback.description,  // Description of the feedback
      rating: feedback.star,          // Rating given
    }));
    res.json(transformedFeedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks', error });
  }
});



// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
