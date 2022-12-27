const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const ejs = require('ejs');

// Set up express app
const app = express();

// Use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('pages'));

// Set view engine
app.set('view engine', 'ejs');

// Connect to MongoDB
const uri = "mongodb+srv://Dpehect:yunusemre366@cluster0.olfqcop.mongodb.net/nodemongo2";
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  // Handle error
  if (err) {
    console.log(err);
  }

  // Connected to MongoDB
  const db = client.db('test');
  const usersCollection = db.collection('users');
  const productsCollection = db.collection('products');
  const ordersCollection = db.collection('orders');
  
  // Routes
  app.get('/', (req, res) => {
    res.render('index');
  });
  
  app.get('/users', (req, res) => {
    usersCollection.find({}).toArray((err, users) => {
      if (err) {
        console.log(err);
      }
      
      res.render('users', { users: users });
    });
  });
  
  app.get('/products', (req, res) => {
    productsCollection.find({}).toArray((err, products) => {
      if (err) {
        console.log(err);
      }
      
      res.render('products', { products: products });
    });
  });
  
  app.get('/orders', (req, res) => {
    ordersCollection.find({}).toArray((err, orders) => {
      if (err) {
        console.log(err);
      }
      
      res.render('orders', { orders: orders });
    });
  });
  app.post('/add-user', (req, res) => {
    const user = {
      name: req.body.name,
      email: req.body.email
    };
    
    usersCollection.insertOne(user, (err, result) => {
      if (err) {
        console.log(err);
      }
      
      res.redirect('/users');
    });
  });
  
  app.post('/add-product', (req, res) => {
    const product = {
      name: req.body.name,
      price: req.body.price
    };
    
    productsCollection.insertOne(product, (err, result) => {
      if (err) {
        console.log(err);
      }
      
      res.redirect('/products');
    });
  });
  
  app.post('/add-order', (req, res) => {
    const order = {
      user: req.body.user,
      product: req.body.product,
      quantity: req.body.quantity
    };
    
    ordersCollection.insertOne(order, (err, result) => {
      if (err) {
        console.log(err);
      }
      
      res.redirect('/orders');
    });
  });
  
  // Start server
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
});
