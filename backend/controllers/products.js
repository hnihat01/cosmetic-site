// Import your Post model
const Post = require('../models/Post');

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
                    aboutBrand:post.aboutBrand,
                    category:post.category

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
