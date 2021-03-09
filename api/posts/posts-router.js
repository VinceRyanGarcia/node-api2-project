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
router.post('/api/posts', (req,res) => {
    const newPost = req.body

    if(!newPost.title || !newPost.contents){
        res.status(400).json({ message: "Please provide title and contents for the post" })
    }else{
        Post.insert(newPost)
        .then( post => {
            res.status(201).json({ message:"Created" })
        })
        .catch( err => {
            res.status(500).json({ message:"There was an error while saving the post to the database" })
        })
    }
})

// [PUT] /api/posts:id | Updates the post with the specified id using data from the request body and returns the modified document not the original
router.put('./api/posts/:id', (req,res) => {
    const { id } = req.params;
    const updates = req.body;

    Post.update(id,updates)
    .then(post=>{
        if(!updates.title || !updates.contents){
            res.status(400).json({message: "Please provide title and contents for the post"})
        }else{
            if(!post){
                res.status(404).json({message: "The post with the specified ID does not exist"})
            }else{
                res.status(200).json(post);
            }
        }
    })
})
// [DELETE] /api/posts:id | Removes the post with the specified id and returns the deleted post object
router.delete('./api/posts:id', (req,res) => {
    const {id} = req.params;
    Post.remove(id)
        .then( post => {
            if(!post){
                res.status(404).json({message:"The post with the specified ID does not exist"})
            }else{
                res.status(200).json({post})
            }
        })
        .catch( err => {
            res.status(500).json({ message:"The post could not be removed" })
        })
})
// [GET] /api/posts/:id/comments | Returns an array of all the comment objects associated with the post with the specified id
// router.get('./api/posts/:id/comments' (req,res) => {})

module.exports = router;