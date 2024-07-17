
const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const feedRoutes = require('./routes/feed');
const cartRoutes = require('./routes/cart');
const favoriteRoutes = require('./routes/favorite');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');
const sessionRoute = require('./routes/session');
const userRoute = require('./routes/user');
const isAuthenticated=require('./middleware/authMiddleware');
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
     origin: 'http://localhost:3000',
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // This allows the browser to include credentials in the requests
}));

const mongoDbURL = 'mongodb+srv://nihathatice299:Kitapkurdu1270@agena.bsfzijx.mongodb.net/products';

app.use(session({
    secret: 'somesupersecretsecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoDbURL }),
    cookie: { maxAge: 180 * 60 * 1000,
         httpOnly: true ,
         secure: false, // Set to true if you're using HTTPS
         sameSite: 'lax',} // 3 hours
}));

// Debugging session setup
app.use((req, res, next) => {
    if (req.session && req.session.userId) {
        req.userId = req.session.userId;
      }
   console.log('Session app.js:', req.session, req.userId);
    next();
});

// Set up multer for file upload
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images'); // Set destination folder
    },
    filename: (req, file, cb) => {
        const uniquePrefix = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, uniquePrefix + file.originalname); // Generate unique filename
    }
});

// Define file filter to accept only specific image file types
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        cb(null, true); // Accept file
    } else {
        cb(null, false); // Reject file
    }
};

// Configure multer middleware
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).fields([
    { name: 'imageUrl', maxCount: 1 },
    { name: 'secondImage', maxCount: 1 },
    { name: 'thirdImage', maxCount: 1 }
]));

// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Set up routes
app.use('/feed', feedRoutes);
app.use('/cart', cartRoutes);
app.use('/favorite', favoriteRoutes);
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/auth', authRoutes);
app.use('/session', sessionRoute);
app.use('/user', userRoute);
app.use(isAuthenticated);

// Connect to MongoDB Atlas
mongoose.connect(mongoDbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






// const express = require("express");
// const mongoose = require('mongoose');
// const path = require('path');
// const multer = require('multer');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const authRoutes=require('./routes/auth');
// const feedRoutes = require('./routes/feed');
// const cartRoutes = require('./routes/cart');
// const favoriteRoutes= require('./routes/favorite');
// const productsRoutes= require('./routes/products');
// const ordersRoutes=require('./routes/orders');

// const app = express();
// const cors= require('cors');
// app.use(bodyParser.json());
// const mongoDbURL='mongodb+srv://nihathatice299:Kitapkurdu1270@agena.bsfzijx.mongodb.net/products';
// app.use(session({
//     secret: 'somesupersecretsecret',
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({ mongoUrl: mongoDbURL }),
//     cookie: { maxAge: 180 * 60 * 1000 , httpOnly: true} // 3 hours
//   }));
  
// // Set up multer for file upload
// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'images'); // Set destination folder
//     },
//     filename: (req, file, cb) => {
//         const uniquePrefix = new Date().toISOString().replace(/:/g, '-') + '-';
//         cb(null, uniquePrefix + file.originalname); // Generate unique filename
//     }
// });

// // Define file filter to accept only specific image file types
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
//         cb(null, true); // Accept file
//     } else {
//         cb(null, false); // Reject file
//     }
// };

// // Configure multer middleware

// app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).fields([
//     { name: 'imageUrl', maxCount: 1 },
//     { name: 'secondImage', maxCount: 1 },
//     { name: 'thirdImage', maxCount: 1 }
// ]));


// // Serve static files from the 'images' directory
// app.use('/images', express.static(path.join(__dirname, 'images')));

// // Set CORS headers
// // app.use((req, res, next) => {
// //     res.setHeader('Access-Control-Allow-Origin', '*');
// //     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
// //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// //     next();
// // });

// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true // This allows the browser to include credentials in the requests

//   }));

// // Set up routes
// app.use('/feed', feedRoutes);
// app.use('/cart', cartRoutes);
// app.use('/favorite', favoriteRoutes);
// app.use('/products', productsRoutes);
// app.use('/orders', ordersRoutes);
// app.use('/auth', authRoutes);
// // Connect to MongoDB Atlas
// mongoose.connect(mongoDbURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => {
//     console.log('MongoDB connected successfully');
// })
// .catch(err => {
//     console.error('Error connecting to MongoDB:', err);
// });

// // Start the server
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
