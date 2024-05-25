const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let products = [
  {
    id: 1,
    url: 'https://rukminim1.flixcart.com/image/300/300/l51d30w0/shoe/z/w/c/10-mrj1914-10-aadi-white-black-red-original-imagft9k9hydnfjp.jpeg?q=70',
    name: 'TRQ White Shoes',
    category: 'Shoes',
    seller: 'AMZ Seller Ghz',
    price: 1999
  },
  {
    id: 2,
    url: 'https://5.imimg.com/data5/KC/PC/MY-38629861/dummy-chronograph-watch-500x500.jpg',
    name: 'LOREM Watch Black',
    category: 'Watches',
    seller: 'Watch Ltd Siyana',
    price: 2599
  },
  {
    id: 3,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq39iB_cO6uhZ59vubrqVuYTJQH-4Qa0hU9g&usqp=CAU',
    name: 'AMZ Laptop 8GB RAM',
    category: 'Laptops',
    seller: 'Delhi Laptops',
    price: 50000
  },
  {
    id: 4,
    url: 'https://in.images.search.yahoo.com/search/images;_ylt=AwrKFY6cDDlmG3Ulg4K7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3BpdnM-?p=security+camera&fr2=piv-web&type=E211IN826G0&fr=mcafee#id=4&iurl=https%3A%2F%2Ftechtrendspro.com%2Fwp-content%2Fuploads%2F2018%2F04%2FAmcrest-TVL-960H.jpg&action=click',
    name: 'Security Camera',
    category: 'CCTV',
    seller: 'Camron LTD',
    price: 4000
  },
  {
    id: 5,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG9e8Axt-h9q8EIybKfjGzbkIWJAr50_BX7Q&usqp=CAU',
    name: 'Watch Pink',
    category: 'Watches',
    seller: 'Watch Ltd',
    price: 2000
  },
  {
    id: 6,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9xzgtOpMxdpfgBOg3OKsEqYRkNBbuprJj4w&usqp=CAU',
    name: 'Cup red Color',
    category: 'Cup',
    seller: 'ABS Ltd',
    price: 100
  },
];

let cart = [];

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Get cart items
app.get('/cart', (req, res) => {
  res.json(cart);
});

// Add item to cart
app.post('/cart', (req, res) => {
  const { id } = req.body;
  const product = products.find(prod => prod.id === id);
  if (product) {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Remove item from cart
app.delete('/cart/:id', (req, res) => {
  const { id } = req.params;
  cart = cart.filter(item => item.id != id);
  res.json(cart);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
