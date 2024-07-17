const Cart = require('../models/Cart');
const Post = require('../models/Post');

exports.postAddToCart = async (req, res, next) => {
  const { productIds } = req.body; // Retrieve productIds from request body

  // console.log('Adding products to cart with IDs:', productIds);

  try {
    // Fetch products with required fields from the Post model
    const products = await Post.find({ _id: { $in: productIds } })
      .select('pname brand milliliters price imageUrl'); // Specify required fields

    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'Products not found' });
    }

    // Retrieve existing cart items to check for duplicates
    const existingCartItems = await Cart.find({ productId: { $in: productIds } });

    // Create a map to track existing cart items by productId
    const cartItemMap = {};
    existingCartItems.forEach(item => {
      cartItemMap[item.productId] = item;
    });

    // Prepare cart items to be added or updated
    const cartItems = [];

    // Iterate over fetched products and update quantity if already in cart
    products.forEach(product => {
      const productId = product._id.toString();

      if (cartItemMap[productId]) {
        // If product already exists in cart, update its quantity
        const existingCartItem = cartItemMap[productId];
        existingCartItem.quantity += 1; // Increment quantity
        cartItems.push(existingCartItem);
      } else {
        // If product is not in cart, create a new cart item
        cartItems.push({
          productId: product._id,
          pname: product.pname,
          brand: product.brand,
          milliliters: product.milliliters,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1 // Default quantity for new items
        });
      }
    });

    // Bulk write operation to update or insert cart items
    const bulkWriteOperations = cartItems.map(item => ({
      updateOne: {
        filter: { productId: item.productId },
        update: { $set: item },
        upsert: true // Create new document if not found
      }
    }));

    // Perform the bulk write operation
    const result = await Cart.bulkWrite(bulkWriteOperations);

    res.status(200).json({ message: 'Products added to cart successfully', result });
  } catch (error) {
    console.error('Error adding products to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAddToCart=async (req,res,next)=>{
  try {
    // Fetch cart data from the database (assuming you have a method in your model)
    const cartItems = await Cart.find(); // Adjust this query according to your data structure

    // Return the cart data as JSON response
    res.status(200).json({ cartItems });
  } catch (error) {
    console.error('Error fetching cart data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.deleteProductById = async (req, res, next) => {
  const { productId } = req.params;

  try {
    // Implement deletion logic to delete the product from MongoDB
    const result = await Cart.deleteOne({ _id: productId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateProductQuantity = async (req, res, next) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  console.log('Updating product quantity for productId:', productId, 'to quantity:', quantity);

  try {
    const updatedProduct = await Cart.findByIdAndUpdate(
      productId,
      { quantity: quantity },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product quantity updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product quantity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
