import React, { Component } from 'react'
import { Link } from 'react-router'

import { highlight } from '../helpers'
import BlogTitle from './BlogTitle'

function Excerpt({ body, ...props }) {
    const excerptField = body.find(field => field.type === 'paragraph')

    if (!excerptField.value) {
        return null
    }

    const value = props.highlight ? highlight(excerptField.value, props.highlight, true) : excerptField.value
    return <div dangerouslySetInnerHTML={{ __html: value }} />
}

class BlogTease extends Component {
    render() {
        const { author } = this.props
        const _author = this.props.highlight ? highlight(author, this.props.highlight) : author

        return (
            <div>
                <BlogTitle {...this.props} />
                <small className="text-muted">by {_author}</small>

                <Excerpt body={this.props.body} highlight={this.props.highlight} />
            </div>
        )
    }
}

export default BlogTease
