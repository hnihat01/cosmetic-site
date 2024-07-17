// Import your Post model
const Post = require('../models/Post');


exports.getByCategory = async (req, res, next) => {
  const { category } = req.params; // Change from req.query to req.params
  // console.log('Category:', category);
  try {
    const posts = await Post.find({ category });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Fetching posts failed!' });
  }
};

exports.AddToCart = async (req, res, next) => {
  const { productId } = req.params;

  // console.log('Fetching product with ID:', productId);

  try {
    const product = await Post.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product fetched successfully', product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getSimilarProducts = (req, res, next) => {
  const productId = req.params.productId;

  // Find the product with the specified productId
  Post.findById(productId)
    .then(product => {
      if (!product) {
        const error = new Error('Product not found.');
        error.statusCode = 404;
        throw error;
      }

      const brand = product.brand;

      // Find other products with the same brand but different productId
      Post.find({ brand: brand, _id: { $ne: productId } })
        .then(similarProducts => {
          res.status(200).json({
            message: 'Similar products fetched successfully',
            products: similarProducts
          });
        })
        .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err); // Pass the error to the error handling middleware
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err); // Pass the error to the error handling middleware
    });
};

exports.postRating= async (req,res,next)=>{
    const { productId } = req.params;
    const { rating } = req.body;
    // console.log('Received productId:', productId);
    // console.log('Received rating:', req.body);
    
    try {
      const post =  await Post.findById(productId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      post.rating = rating;
      await post.save();
  
      res.json({ message: 'Rating updated successfully', updatedPost: post });
    } catch (error) {
      console.error('Error updating rating:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getPost = (req, res, next) => {
    const productId = req.params.productId;
  
    Post.findById(productId)
      .then(product => {
        if (!product) {
          const error = new Error('Product not found.');
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json({ message: 'Product fetched successfully', product: product });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err); // Pass the error to the error handling middleware
      });
  };
  
  exports.getProducts = (req, res, next) => {
    Post.find({}, '_id category pname brand price milliliters imageUrl rating')
    .then(posts => {
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json({
            message: 'Posts fetched successfully',
            posts: posts
        });
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    });
};


  exports.getPosts = (req, res, next) => {
    Post.find()
        .then(posts => {
            console.log(posts); // Log the retrieved posts

            if (!posts || posts.length === 0) {
                return res.status(404).json({ message: 'No products found' });
            }
            
            // Map posts to include absolute URLs for images and additional fields including category
            const updatedPosts = posts.map(post => {
                const categoryQueryParam = post.category ? `&category=${encodeURIComponent(post.category)}` : '';
                return {
                    _id: post._id,
                    pname: post.pname,
                    category: post.category,
                    brand: post.brand,
                    price: post.price,
                    milliliters: post.milliliters,
                    imageUrl: post.imageUrl ? `http://localhost:8080/images/${post.imageUrl}?${categoryQueryParam}` : null,
                    secondImage: post.secondImage ? `http://localhost:8080/images/${post.secondImage}?${categoryQueryParam}` : null,
                    thirdImage: post.thirdImage ? `http://localhost:8080/images/${post.thirdImage}?${categoryQueryParam}` : null,
                    rating: post.rating,
                    description: post.description,
                    secDes: post.secDes,
                    ingredients: post.ingredients,
                    aboutBrand: post.aboutBrand,
                    category: post.category,
                };
            });

            res.status(200).json({
                message: 'Posts fetched successfully',
                posts: updatedPosts
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'Failed to fetch posts' });
        });
};



exports.postPosts = async (req, res, next) => {
    const { pname, milliliters, brand, price, rating, description, secDes, aboutBrand, ingredients, category } = req.body;
    const imageUrl = req.files['imageUrl'] ? req.files['imageUrl'][0].filename : '';
    const secondImage = req.files['secondImage'] ? req.files['secondImage'][0].filename : '';
    const thirdImage = req.files['thirdImage'] ? req.files['thirdImage'][0].filename : '';

    // Log all fields to verify their values
    console.log({
      
        pname,
        milliliters,
        brand,
        price,
        imageUrl,
        secondImage,
        thirdImage,
        rating,
        description,
        secDes,
        ingredients,
        aboutBrand,
        category
    });

    if (!pname || !milliliters || !brand || !price || !imageUrl || !secondImage || !thirdImage || !description || !secDes || !ingredients || !aboutBrand || !category) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        const post = new Post({
          
            pname,
            milliliters,
            brand,
            price,
            imageUrl,
            secondImage,
            thirdImage,
            rating,
            description,
            secDes,
            ingredients,
            aboutBrand,
            category
        });

        const savedPost = await post.save();
        console.log('Post saved successfully:', savedPost);
        res.status(201).json({
            message: 'Post created successfully',
            post: savedPost
        });
    } catch (error) {
        console.error('Error saving post:', error);
        res.status(500).json({
            error: error.message
        });
    }
};



exports.getSimilarProducts = (req, res, next) => {
  const productId = req.params.productId;

  // Find the product with the specified productId
  Post.findById(productId)
    .then(product => {
      if (!product) {
        const error = new Error('Product not found.');
        error.statusCode = 404;
        throw error;
      }

      const brand = product.brand;

      // Find other products with the same brand but different productId
      Post.find({ brand: brand, _id: { $ne: productId } })
        .then(similarProducts => {
          res.status(200).json({
            message: 'Similar products fetched successfully',
            products: similarProducts
          });
        })
        .catch(err => {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err); // Pass the error to the error handling middleware
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err); // Pass the error to the error handling middleware
    });
};

exports.postRating= async (req,res,next)=>{
    const { productId } = req.params;
    const { rating } = req.body;
    console.log('Received productId:', productId);
    console.log('Received rating:', req.body);
    
    try {
      const post =  await Post.findById(productId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      post.rating = rating;
      await post.save();
  
      res.json({ message: 'Rating updated successfully', updatedPost: post });
    } catch (error) {
      console.error('Error updating rating:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getPost = (req, res, next) => {
    const productId = req.params.productId;
  
    Post.findById(productId)
      .then(product => {
        if (!product) {
          const error = new Error('Product not found.');
          error.statusCode = 404;
          throw error;
        }
        res.status(200).json({ message: 'Product fetched successfully', product: product });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err); // Pass the error to the error handling middleware
      });
  };
  

  exports.getPosts = (req, res, next) => {
    Post.find()
        .then(posts => {
            if (!posts || posts.length === 0) {
                return res.status(404).json({ message: 'No products found' });
            }
            // Map posts to include absolute URLs for images and additional fields
            const updatedPosts = posts.map(post => {
                return {
                    _id: post._id,
                    pname: post.pname,
                    brand: post.brand,
                    price: post.price,
                    milliliters: post.milliliters,
                    imageUrl: post.imageUrl ? `http://localhost:8080/images/${post.imageUrl}` : null,
                    secondImage: post.secondImage ? `http://localhost:8080/images/${post.secondImage}` : null,
                    thirdImage: post.thirdImage ? `http://localhost:8080/images/${post.thirdImage}` : null,
                    rating: post.rating,
                    description: post.description,
                    secDes:post.secDes,
                    ingredients:post.ingredients,
                    aboutBrand:post.aboutBrand
                };
            });
            res.status(200).json({
                message: 'Posts fetched successfully',
                posts: updatedPosts
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'Failed to fetch posts' });
        });
};

// exports.postPosts = (req, res, next) => {
//     // Extract data from request body and file uploads
//     const { pname, milliliters, brand, price, rating, description, secDes, aboutBrand, ingredients } = req.body;
//     const imageUrl = req.files['imageUrl'] ? req.files['imageUrl'][0].filename : '';
//     const secondImage = req.files['secondImage'] ? req.files['secondImage'][0].filename : '';
//     const thirdImage = req.files['thirdImage'] ? req.files['thirdImage'][0].filename : '';    
//   //console.log(imageUrl+'imageurl', secondImage, thirdImage);
//   //console.log(req.files+'feed.js'); // Inspect uploaded files

//     // Check if required fields are missing
//     if (!pname || !milliliters || !brand || !price || !rating || !description || !secDes || !aboutBrand || !ingredients) {
//         return res.status(400).json({ error: "Missing required fields" });
//     }

//     // Create a new Post instance
//     const post = new Post({
//         pname: pname,
//         milliliters: milliliters,
//         brand: brand,
//         price: price,
//         imageUrl: imageUrl,
//         secondImage: secondImage,
//         thirdImage: thirdImage,
//         rating: rating,
//         description: description,
//         secDes:secDes,
//         ingredients:ingredients,
//         aboutBrand:aboutBrand
//     });
// console.log(post);
//     // Save the post to the database
//     post.save()
//         .then(savedPost => {
//             console.log('Post saved successfully:', savedPost);
//             // Respond with success message and saved post data
//             res.status(201).json({
//                 message: 'Post created successfully',
//                 post: savedPost
//             });
//         })
//         .catch(error => {
//             console.error('Error saving post:', error);
//             // Respond with error message
//             res.status(500).json({
//                 error: error.message // Send specific error message
//             });
//         });
// };

// exports.getPosts=(req,res,next)=>{
//     Post.find()
//     .then(posts=>{
//         if(!posts || posts.length===0){
//             return res.status(404).json({message:'No products found'});
//         }
//         res.status(200).json({
//             message:'Posts fetched successfuly',
//             posts:posts
//         });
//     })
//     .catch(error=>{
//         console.log(error);
//         res.status(500).json({error:'Failed to fetch'});
//     })
//     }
    

// exports.createPost = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const error = new Error('Validation failed, entered data is incorrect.');
//     error.statusCode = 422;
//     throw error;
//   }
//   if(!req.file){
//     const error=new Error('No image');
//     error.statusCode=422;
//     throw error;
//   }
//   const imageUrl=req.file.path;
//   const title = req.body.title;
//   const content = req.body.content;
//   let creator;
//   const post = new Post({
//     title: title,
//     content: content,
//     imageUrl:imageUrl,
//     creator: req.userId
//   });
//   post
//     .save()
//     .then(result => {
//     return  User.findById(req.userId);})
//     .then(user=>{
//       creator=user;
//       user.posts.push(post);
//       return user.save();
//       io.getIO().emit('posts',{action:'create', post:post}); 
//     })
//     .then(result=>{
//       res.status(201).json({
//         message: 'Post created successfully!',
//         post: post,
//         creator:{_id:creator._id, name:creator.name}
//       });
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };




// exports.updatePost=(req, res, next)=>{
//   const postId=rq.params.postId;
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const error = new Error('Validation failed, entered data is incorrect.');
//     error.statusCode = 422;
//     throw error;
//   }
//   const title=rq.body.title;
//   const content=rq.body.content;
//   let imageUrl=rq.body.image;
//   if(req.file){
//     imageUrl=req.file.path;
//   }
//   if(!req.file){
//     const error = new Error('No file picked');
//     error.statusCode = 422;
//     throw error;
//   }

//   Post.findById(postId)
//   .then(post => {
//     if (!post) {
//       const error = new Error('Could not find post.');
//       error.statusCode = 404;
//       throw error;

//     }
//     if(post.creator.toString() !==req.userId){
//       const error = new Error('not auth.');
//       error.statusCode = 403;
//       throw error;
//     }
//     if(imageUrl !==post.imageUrl){
//       clearImage(post.imageUrl);
//     }
//     post.title=title;
//     post.imageUrl=imageUrl;
//     post.content=content;
//     return post.save();
//   })
//   .then(result=>{
//     res.status(200).json({message:'Post updated', post:result});
//   })
//   .catch(err => {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   });

// }
// exports.deletePost=(req, res, next)=>{
//   const postId=req.params.postId;
//   Post.findById(postId)
//   .then(post=>{
//     if (!post) {
//       const error = new Error('Could not find post.');
//       error.statusCode = 404;
//       throw error;
//     }

//     if(post.creator.toString() !==req.userId){
//       const error = new Error('not auth.');
//       error.statusCode = 403;
//       throw error;
//     }

//     //user
//     clearImage(post.imageUrl);
//     return Post.findByIdAndDelete(postId);
//   })
//   .then(result=>{
//     return User.findById(req.userId);})
//     .then(user=>{
//     user.posts.pull(postId);
//     return user.save();})
//     .then(result=>{
//     theres.status(200).json({message:'Delete post.'});
//   })
//   .catch(err => {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   });

// }

// const clearImage=filePath=>{
//   filePath=path.join(__dirname,'..',filePath);
//   fs.unlink(filePath, err=>console.log(err));
// };