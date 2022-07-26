const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) =>{
    console.log('hello')
    Blog.find({}).then(blogs => {
        console.log('finding blogs')
        response.json(blogs)
    })
})

blogRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
    .then(blog => {
        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

blogRouter.post('/', (request, response, next) => {
    console.log('posting')
    const body = {...request.body}

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    blog.save().then(() => {
        console.log(blog.title, 'saved to DB')
        response.json(blog)
    })
    .catch(error => next (error))
})

blogRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndDelete({ _id: request.params.id })
    .then(() => {
        response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = blogRouter