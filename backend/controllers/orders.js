const Order = require('../models/orders');
exports.placeOrder = async (req, res, next) => {
    try {
      const { products } = req.body;
  
      if (!products || products.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }
  
      // Validate each product object
      for (const product of products) {
        if (!product.productId || !product.quantity || !product.price) {
          return res.status(400).json({ message: 'Invalid product data' });
        }
      }
  
      // Create a new order object with the products array
      const order = new Order({
        products: products.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: products.reduce((sum, item) => sum + item.price * item.quantity, 0)
      });
  
      // Save the order to the database
      await order.save();
  
      // Send a success response with the order details
      res.status(200).json({ message: 'Order placed successfully', order });
    } catch (error) {
      // Handle any errors and send an error response
      console.error('Error placing order:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  };
  exports.getOrderWithProducts = async (req, res, next) => {
    try {
      // Fetch all orders
      const orders = await Order.find().populate('products.productId');
  
      // Structure the orders with populated product details
      const ordersWithProductDetails = orders.map(order => ({
        _id: order._id,
        totalAmount: order.totalAmount,
        createdAt: order.createdAt,
        products: order.products.map(product => ({
          _id: product.productId._id,
          pname: product.productId.pname,
          brand: product.productId.brand,
          milliliters: product.productId.milliliters,
          price: product.price,
          quantity: product.quantity,
          imageUrl: product.productId.imageUrl,
        }))
      }));
  
      res.status(200).json({ orders: ordersWithProductDetails });
    } catch (error) {
      console.error('Error fetching order products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  