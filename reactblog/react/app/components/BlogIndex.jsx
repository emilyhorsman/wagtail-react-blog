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

    getPages() {
        const search = this.props.search.trim().toLowerCase()

        if (search === '') {
            return this.props.pages
        }

        return this.props.pages.filter(page => {
            if (page.title.toLowerCase().includes(search)) {
                return true
            }

            if (page.author.toLowerCase().includes(search)) {
                return true
            }

            return page.body.some(field => {
                if (field.type !== 'heading' && field.type !== 'paragraph') {
                    return false
                }

                return field.value.toLowerCase().includes(search)
            })
        })
    }

    render() {
        return (
            <div>
                {this.getPages().map(post =>
                    <BlogTease key={post.id} {...post} />
                )}
            </div>
        )
    }
}

export default BlogIndex
