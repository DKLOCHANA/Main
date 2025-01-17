const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const { createServer } = require('http'); // For WebSocket integration
const { Server } = require('socket.io'); // Socket.io for WebSocket communication

const app = express();
const httpServer = createServer(app); // Create an HTTP server for WebSocket support
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Replace with your Next.js app's URL
    methods: ["GET", "POST"],
  },
});

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

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  title: String,
  address: String,
  description: String,
  star: Number,
  date: { type: Date, default: Date.now },
});
const OrderSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  address: String,
  apartment: String,  // Add the apartment field
  city: String,
  zipcode: String,
});

const Product = mongoose.model('Product', productSchema);
const Feedback = mongoose.model('Review', feedbackSchema);

const Order = mongoose.model('Order', OrderSchema);
// User Schema for Authentication
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("user", userSchema);


app.post('/api/orders', async (req, res) => {
  try {
    const { email, firstName, lastName, address, apartment, city, zipcode } = req.body;
    const order = new Order({
      email,
      firstName,
      lastName,
      address,
      apartment,  // Add apartment field here
      city,
      zipcode
    });
    await order.save();
    res.status(201).json({ message: 'Order saved successfully' });
  }  catch (error) {
    console.log('Error details:', error); // Log the error to the console
    res.status(500).json({ error: 'Failed to save order', details: error.message });
    console.log(res.status(500).json({ error: 'Failed to save order', details: error.message }))
  }
});
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
      id: feedback._id,
      customerName: feedback.name,
      address: feedback.address,
      date: feedback.date,
      title: feedback.title,
      comment: feedback.description,
      rating: feedback.star,
    }));
    res.json(transformedFeedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks', error });
  }
});

// API Route to handle review submission (POST)
app.post('/submit', async (req, res) => {
  try {
    const { name, email, title, address, description, star } = req.body;
    const feedback = new Feedback({
      name, email, title, address, description, star,
    });

    await feedback.save(); // Save to the database
    res.status(201).json({ message: 'Feedback successfully added' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add feedback', error });
  }
});

//websockets
const connectedUsers = {};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user joining the chat
  socket.on('join', (username) => {
    connectedUsers[socket.id] = username;
    console.log(`${username} joined the chat`);
    io.emit('userList', Object.values(connectedUsers)); // Broadcast user list
  });

  // Handle chat message
  socket.on('sendMessage', (message) => {
    // Send message to all clients (including sender)
    io.emit('receiveMessage', message);  // This broadcasts the message to all clients
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    delete connectedUsers[socket.id];
    io.emit('userList', Object.values(connectedUsers)); // Update user list
  });
});
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(400).json({ error: "User registration failed", details: err });
  }
});

// Login Endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: "Invalid credentials" });

    // Wrap the secret key in quotes
    const token = jwt.sign({ id: user._id }, "sdfdfdhhFSDFDFSFKJDFKJDSFJKLSVNLSDKVJKLSDfsdf", { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.log(err);  // Log the error details for debugging
    res.status(500).json({ error: "Login failed", details: err.message });
  }
});
app.get('/api/user', async (req, res) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization?.split(' ')[2]; // 'Bearer <token>'
    
    if (!token) {
      return res.status(403).json({ error: "Token is required" });
    }

    // Verify the token
    jwt.verify(token, "sdfdfdhhFSDFDFSFKJDFKJDSFJKLSVNLSDKVJKLSDfsdf", async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }

      // Find the user by their ID from the decoded JWT
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Send the user data back as a response
      res.json({
        username: user.name,
        email: user.email,
        // Add any other user data you want to return
      });
    });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: "Failed to fetch user data" });
  }
});
// Endpoint



// Start Server
const PORT = 5000;
httpServer.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));