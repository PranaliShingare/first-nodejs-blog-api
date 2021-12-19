const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const port = 3000;

const Post = require('./src/models/post');
const post = require('./src/models/post');

const db = mongoose.connect('mongodb://localhost:27017/first-node-api')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.get('/',(req,res)=>{
    // handle the request for root route
    res.send({ping : "pong"})
})

app.post('/posts',(req,res)=>{
    // Get values from request payload
    const title = req.body.title
    const author = req.body.author
    const content = req.body.content

    // Assign values to Post model
    var post = new Post()
    post.title = title
    post.author = author
    post.content = content

    // Save the post
    post.save((error,savedPost)=>{
        if(error){
            res.status(500).send({error : "Unable yo save the post"})
        }
        else{
            res.status(200).send(savedPost)
        }
    })

})

//Update a post
app.patch('/posts/:id',async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        post.hidden = req.body.hidden
        const a1 = await post.save()
        res.json(a1)
    }
    catch(err){
        res.send("error" +err)
    }
})

//Delete a post
app.delete('/posts/:id',async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        post.hidden = req.body.hidden
        const a1 = await post.remove()
        res.json(a1)
    }
    catch(err){
        res.send("error" +err)
    }
})

// Get list of all posts
app.get('/posts',(req,res)=>{
    Post.find({},(error,posts)=>{
        if(error){
            res.status(422).send({error : "Unable to fetch the post"})
        }
        else{
            res.status(200).send(posts)
        }
    })
})




app.get('/presentation',(req,res)=>{
    res.send("<h1>Presentation page</h1> <p>This presentation page is created by Pranali</p>")
})
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})