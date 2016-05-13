import axios from 'axios'
import React, { Component } from 'react'

import BlogTitle from './BlogTitle'

let Fields = {}

Fields.paragraph = function(value) {
    return <div dangerouslySetInnerHTML={{ __html: value }} />
}

Fields.image = function(value) {
    return <span>image {value}</span>
}

Fields.heading = function(value) {
    return <h3>{value}</h3>
}

class BlogPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            post: {},
        }
    }

    componentDidMount() {
        this.setState({
            loading: true,
        })

        axios.get(`/api/v1/pages/${this.props.params.postId}/`)
            .then(response => {
                this.setState({
                    loading: false,
                    post: response.data,
                })
            })
    }

    render() {
        if (Object.getOwnPropertyNames(this.state.post).length === 0) {
            return null
        }

        return (
            <article>
                <BlogTitle {...this.state.post} />

                {this.state.post.body.map((field, index) =>
                    <span key={index}>
                        {Fields[field.type](field.value)}
                    </span>
                )}
            </article>
        )
    }
}

export default BlogPage
