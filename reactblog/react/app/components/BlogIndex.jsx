import axios from 'axios'
import React, { Component } from 'react'

import BlogTease from './BlogTease'

class BlogIndex extends Component {
    componentDidMount() {
        this.props.incrementLoading()

        axios.get('/api/v1/pages/', {
                params: {
                    type: 'blog.BlogPage',
                    fields: ['title', 'author', 'body'].join(','),
                },
            })
            .then(this.props.handlePagesIndex)
    }

    render() {
        return (
            <div>
                {this.props.pages.map(post =>
                    <BlogTease key={post.id} {...post} />
                )}
            </div>
        )
    }
}

export default BlogIndex
