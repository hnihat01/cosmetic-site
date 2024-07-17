const Favorite = require('../models/Favorite');
const Post = require('../models/Post');

exports.postFavorites = async (req, res, next) => {
  const { productId, price, brand, milliliters, pname, imageUrl } = req.body;
  const userId = req.userId;
  console.log('f-userid:',userId);

  try {
    const existingFavorite = await Favorite.findOne({ productId, userId});

    if (existingFavorite) {
      // If the product is already favorited, remove it
      await Favorite.findByIdAndDelete(existingFavorite._id);
      return res.status(200).json({ message: 'Product removed from favorites', favorite: false });
    }

    // Check if the product exists in the Post collection
    const existingProduct = await Post.findOne({ _id: productId });
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Add the product as a favorite
    const favorite = new Favorite({
      userId,
      productId: existingProduct._id,
      price,
      brand,
      milliliters,
      pname,
      imageUrl,
      favorite: true
    });

    await favorite.save();
    res.status(200).json({ message: 'Product added to favorites', favorite: true });
  } catch (error) {
    console.error('Error adding/removing product to/from favorites:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getFavourites = async (req, res, next) => {
  const userId = req.userId; // Get userId from middleware

  try {
    const items = await Favorite.find({ userId});
    res.status(200).json({ items });
  } catch (error) {
    console.error('Error fetching favorites data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getFavourite = async (req, res, next) => {
  const productId = req.params.productId;
  const userId = req.userId; // Get userId from middleware

  try {
    const product = await Favorite.findOne({ productId, userId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(200).json({ message: 'Product fetched successfully', product });
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




// const Favorite = require('../models/Favorite');
// const Post = require('../models/Post');

// exports.postFavorites = async (req, res, next) => {
//     const { productId, price, brand, milliliters, pname, imageUrl } = req.body;
//   //  console.log('Request Body:', req.body);

//     try {
//         const existingFavorite = await Favorite.findOne({ productId, userId: req.session.userId });

//         if (existingFavorite) {
//             // If the product is already favorited, remove it (set favorite to false)
//             await Favorite.findByIdAndDelete(existingFavorite._id);
//             res.status(200).json({ message: 'Product removed from favorites', favorite: false });
//         } else {
//             // Check if the product exists in the Post collection
//             const existingProduct = await Post.findOne({ _id: productId });
//             if (!existingProduct) {
//                 return res.status(404).json({ error: 'Product not found' });
//             }

//             // Add the product as a favorite
//             const favorite = new Favorite({
//                 userId: req.session.userId, // Include userId in the favorite
//                 productId: existingProduct._id,
//                 price,
//                 brand,
//                 milliliters,
//                 pname,
//                 imageUrl,
//                 favorite: true // Set favorite to true when adding
//             });

//             await favorite.save();
//             res.status(200).json({ message: 'Product added to favorites', favorite: true });
//         }
//     } catch (error) {
//         console.error('Error adding/removing product to/from favorites:', error.message);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// exports.getFavourites=async (req,res,next)=>{
//     try {
//       // Fetch cart data from the database (assuming you have a method in your model)
//       const items = await Favorite.find(); // Adjust this query according to your data structure
//       console.log(items);

//       // Return the cart data as JSON response
//       res.status(200).json({ items });
//     } catch (error) {
//       console.error('Error fetching cart data:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }
  
//   exports.getFavourite = async (req, res, next) => {
//     const productId = req.params.productId;
   
//     try {
//        console.log(productId);
//       const product = await Favorite.findOne({ productId });
//       if (!product) {
//         return res.status(404).json({ message: 'Product not found.' });
//       }
//       res.status(200).json({ message: 'Product fetched successfully', product });
//     } catch (error) {
//       console.error('Error fetching product data:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };
  
  // exports.getFavourite = (req, res, next) => {
  //   const productId = req.params.productId;
  
  //   Favorite.findById(productId)
  //     .then(product => {
  //       if (!product) {
  //         const error = new Error('Product not found.');
  //         error.statusCode = 404;
  //         throw error;
  //       }
  //       res.status(200).json({ message: 'Product fetched successfully', product: product });
  //     })
  //     .catch(err => {
  //       if (!err.statusCode) {
  //         err.statusCode = 500;
  //       }
  //       next(err); // Pass the error to the error handling middleware
  //     });
  // };