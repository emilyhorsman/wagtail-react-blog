import axios from 'axios'
import React, { Component, cloneElement } from 'react'
import { Link } from 'react-router'
import FaParagraph from 'react-icons/fa/paragraph'

import Loader from './Loader'
import Search from './Search'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: '',
            loading: 0,
            pages: [],
            images: [],
        }
    }

    handleSearch(value) {
        this.incrementLoading()

        axios.get('/api/v1/pages/', {
                params: {
                    type: 'blog.BlogPage',
                    fields: ['title', 'author', 'body'].join(','),
                    search: value,
                }
            })
            .then(this.handlePagesIndex.bind(this))
    }

    handleChange(key, event) {
        const value = event.target.value

        if (key === 'search' && value.trim() !== '') {
            this.handleSearch(value)
        }

        this.setState({ [key]: value })
    }

    handlePagesIndex(response) {
        const fetchedPages = response.data.pages
        const existingPages = this.state.pages
        const pages = fetchedPages.filter(fetchedPage => {
            return !existingPages.some(page => page.id === fetchedPage.id)
        })

        const imageFields = pages.reduce((acc, page) => {
            return acc.concat(page.body.filter(field => field.type === 'image'))
        }, [])

        this.fireImageRequests(imageFields)

        this.setState({
            loading: this.state.loading - 1,
            pages: this.state.pages.concat(pages),
        })
    }

    handlePagesDetail(response) {
        const fetchedPage = response.data
        if (this.state.pages.find(page => page.id === fetchedPage.id)) {
            return
        }

        const imageFields = fetchedPage.body.filter(field => field.type === 'image')

        this.fireImageRequests(imageFields)

        this.setState({
            loading: this.state.loading - 1,
            pages: this.state.pages.concat(fetchedPage),
        })
    }

    handleImagesIndex(response) {
        this.setState({
            loading: this.state.loading - 1,
            images: this.state.images.concat(response.data.images),
        })
    }

    handleImagesDetail(response) {
        this.setState({
            loading: this.state.loading - 1,
            images: this.state.images.concat(response.data),
        })
    }

    fireImageRequests(imageFields) {
        const images = this.state.images
        const unfetchedImages = imageFields.filter(field => !images.some(image => image.id === field.value))

        if (unfetchedImages.length === 0) {
            return
        }

        this.incrementLoading(unfetchedImages.length)
        for (const field of unfetchedImages) {
            axios.get(`/api/v1/images/${field.value}/`)
                .then(this.handleImagesDetail.bind(this))
        }
    }

    incrementLoading(count = 1) {
        this.setState({
            loading: this.state.loading + count,
        })
    }

    render() {
        const { children } = this.props
        const childProps = {
            search: this.state.search,
            loading: this.state.loading,
            handlePagesIndex: this.handlePagesIndex.bind(this),
            handlePagesDetail: this.handlePagesDetail.bind(this),
            handleImagesIndex: this.handleImagesIndex.bind(this),
            handleImagesDetail: this.handleImagesDetail.bind(this),
            incrementLoading: this.incrementLoading.bind(this),
            pages: this.state.pages,
            images: this.state.images,
        }

        return (
            <div>
                <header>
                    <div className="container">
                        <h1>
                            <FaParagraph /> Blog
                        </h1>

                        <Search
                            search={this.props.search}
                            onChange={this.handleChange.bind(this, 'search')}
                        />

                        <Link to="/blog/">
                            All Posts
                        </Link>
                    </div>
                </header>

                <main className="container">
                    <div className="flex-center min-height-bar">
                        <Loader loading={this.state.loading} />
                    </div>

                    {React.Children.map(children, child => cloneElement(child, childProps))}
                </main>
            </div>
        )
    }
}

export default App
