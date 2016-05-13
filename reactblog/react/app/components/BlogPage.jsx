import axios from 'axios'
import React, { Component } from 'react'

import BlogTitle from './BlogTitle'

let Fields = {}

Fields.paragraph = function(value) {
    return <div dangerouslySetInnerHTML={{ __html: value }} />
}

Fields.image = function(value, images) {
    const image = images.find(image => image.id === value)
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
    componentDidMount() {
        // We don't need to fetch a page we already have
        if (this.getPage()) {
            return
        }

        this.props.incrementLoading()

        axios.get(`/api/v1/pages/${this.props.params.postId}/`)
            .then(this.props.handlePagesDetail.bind(this))
    }

    getPage() {
        return this.props.pages.find(page => page.id === parseInt(this.props.params.postId))
    }

    render() {
        const page = this.getPage()
        if (!page) {
            return null
        }

        return (
            <article>
                <BlogTitle {...page} />

                {this.props.loading === 0 && page.body.map((field, index) =>
                    <span key={index}>
                        {Fields[field.type](field.value, this.props.images)}
                    </span>
                )}
            </article>
        )
    }
}

export default BlogPage
