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
  description: String,
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

const Product = mongoose.model('Product', productSchema);

// API Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// API Route to fetch product details by id
app.get('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({ id: productId }); // Query by custom `id`
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
});



// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
