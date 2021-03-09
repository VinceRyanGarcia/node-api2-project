// implement your posts router here
const express = require('express');
const router = express.Router();
const Post = require('./posts-model');

// [GET] /api/posts | Returns an array of all the posts objects contained in db

router.get('/', (req,res) => {
    Post.find(req.query)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            message: "The posts information could not be retrieved",
        })
    })
})

// [GET] /api/posts:id | Returns the post object with the specified
router.get('/api/posts/:id', (req,res) => {
    const {id} = req.params
    
    Post.findById(id)
    .then( post => {
        if( !post ){
            res.status(404).json({ message: "Not Found" })
        }else{
            res.json(post);
        }
    })
    .catch(err => res.status(500).json({ message: "The posts information could not be retrieved" }))
})
// [POSTS] /api/posts | Creates a post using the information sent inside the request body and returns the newwly created post object
// router.post('./api/posts', (req,res) => {
//     const newPost = req.body
// if (!newPost)
// })

// [PUT] /api/posts:id | Updates the post with the specified id using data from the request body and returns the modified document not the original
// [DELETE] /api/posts:id | Removes the post with the specified id and returns the deleted post object
// [GET] /api/posts/:id/comments | Returns an array of all the comment objects associated with the post with the specified id

module.exports = router;