import axios from 'axios'
import React, { Component } from 'react'

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
        return (
            <article>
                <h2>{this.state.post.title}</h2>
            </article>
        )
    }
}

export default BlogPage