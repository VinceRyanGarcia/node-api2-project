// implement your server here
// require your posts router and connect it here
const express = require('express');

const blah = require('./posts/posts-router')
const server = express();

server.use(express.json());
server.use('/api/posts', blah);

server.get('/', (req,res) => {
    res.send(`
    <h2>MVP Yall</h2>
    <p>Welcome to my room</p>
 `)
})

module.exports = server;