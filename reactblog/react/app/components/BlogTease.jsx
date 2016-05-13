import React, { Component } from 'react'
import { Link } from 'react-router'

import BlogTitle from './BlogTitle'

function Excerpt({ body }) {
    const excerptField = body.find(field => field.type === 'paragraph')

    if (!excerptField.value) {
        return null
    }

    return <div dangerouslySetInnerHTML={{ __html: excerptField.value }} />
}

class BlogTease extends Component {
    render() {
        return (
            <div>
                <BlogTitle {...this.props} />

                <Excerpt body={this.props.body} />
            </div>
        )
    }
}

export default BlogTease
