import axios from 'axios'
import React, { Component } from 'react'

import BlogTitle from './BlogTitle'

let Fields = {}

Fields.paragraph = function(value) {
    return <div dangerouslySetInnerHTML={{ __html: value }} />
}

Fields.image = function(value, state) {
    const image = state.images.find(image => image.id === value)
    return (
        <div className="text-center">
            <img
                src={image.original_url}
                width={image.width}
                height={image.height}
            />
        </div>
    )
}

Fields.heading = function(value) {
    return <h3>{value}</h3>
}

class BlogPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: 0,
            post: {},
            images: [],
        }
    }

    componentDidMount() {
        this.setState({
            loading: this.state.loading + 1,
        })

        axios.get(`/api/v1/pages/${this.props.params.postId}/`)
            .then(this.handlePagesResponse.bind(this))
    }

    handlePagesResponse(response) {
        const post = response.data
        const imageFields = post.body.filter(field => field.type === 'image')
        if (imageFields.length === 0) {
            return this.setState({
                loading: 0,
                post: response.data,
            })
        }

        this.setState({
            loading: imageFields.length,
            post: response.data,
        })

        for (const field of imageFields) {
            axios.get(`/api/v1/images/${field.value}/`)
                .then(this.handleImagesResponse.bind(this))
        }
    }

    handleImagesResponse(response) {
        this.setState({
            loading: this.state.loading - 1,
            images: this.state.images.concat(response.data),
        })
    }

    render() {
        if (Object.getOwnPropertyNames(this.state.post).length === 0) {
            return null
        }

        return (
            <article>
                <BlogTitle {...this.state.post} />

                {this.state.loading === 0 && this.state.post.body.map((field, index) =>
                    <span key={index}>
                        {Fields[field.type](field.value, this.state)}
                    </span>
                )}
            </article>
        )
    }
}

export default BlogPage
