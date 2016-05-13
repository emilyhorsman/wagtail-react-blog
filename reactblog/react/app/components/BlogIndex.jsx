import axios from 'axios'
import React, { Component } from 'react'

import BlogTease from './BlogTease'

class BlogIndex extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            posts: [],
        }
    }

    componentDidMount() {
        this.setState({
            loading: true,
        })

        axios.get('/api/v1/pages/', {
                params: {
                    type: 'blog.BlogPage',
                    fields: ['title', 'author', 'body'].join(','),
                },
            })
            .then(response => {
                this.setState({
                    loading: false,
                    posts: response.data.pages,
                })
            })
    }

    render() {
        const { loading, posts } = this.state

        if (loading) {
            return <p>Loading...</p>
        }

        return (
            <div>
                {posts.map(post =>
                    <BlogTease key={post.id} {...post} />
                )}
            </div>
        )
    }
}

export default BlogIndex
