const express= require("express");
const feedController=require('../controllers/feed');

const router=express.Router();
//  feed/posts
//router.get('/posts', feedController.getPosts);

router.post('/posts', feedController.postPosts)

router.get('/posts', feedController.getPosts);

router.get('/products', feedController.getProducts);

router.get('/posts/:category', feedController.getByCategory); // Change route parameter from query to params

router.get('/posts/products/:productId', feedController.getPost);

router.get('/posts/products/:productId/similar', feedController.getSimilarProducts);

router.post('/posts/updateRating/:productId', feedController.postRating);




module.exports=router;