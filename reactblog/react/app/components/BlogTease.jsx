import React, { Component } from 'react'

class BlogTease extends Component {
    render() {
        return (
            <div>
                <div>{this.props.title}</div>
                <div dangerouslySetInnerHTML={{ __html: this.props.body[0].value }} />
            </div>
        )
    }
}

export default BlogTease
