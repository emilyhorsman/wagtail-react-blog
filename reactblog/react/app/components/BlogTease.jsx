import React, { Component } from 'react'
import { Link } from 'react-router'

class BlogTease extends Component {
    render() {
        const { id } = this.props

        return (
            <div>
                <Link to={`/blog/${id}/`}>{this.props.title}</Link>
                <div dangerouslySetInnerHTML={{ __html: this.props.body[0].value }} />
            </div>
        )
    }
}

export default BlogTease
