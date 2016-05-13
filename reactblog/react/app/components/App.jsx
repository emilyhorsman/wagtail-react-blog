import axios from 'axios'
import React, { Component, cloneElement } from 'react'
import { Link } from 'react-router'
import FaParagraph from 'react-icons/fa/paragraph'
import FaSearch from 'react-icons/fa/search'

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

    handleChange(key, event) {
        this.setState({
            [key]: event.target.value,
        })
    }

    handlePagesIndex(response) {
        const pages = response.data.pages
        const imageFields = pages.reduce((acc, page) => {
            return acc.concat(page.body.filter(field => field.type === 'image'))
        }, [])

        this.fireImageRequests(imageFields)

        this.setState({
            loading: this.state.loading - 1,
            pages: this.state.pages.concat(response.data.pages),
        })
    }

    handlePagesDetail(response) {
        const page = response.data
        const imageFields = page.body.filter(field => field.type === 'image')

        this.fireImageRequests(imageFields)

        this.setState({
            loading: this.state.loading - 1,
            pages: this.state.pages.concat(page),
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
        if (imageFields.length === 0) {
            return
        }

        this.incrementLoading(imageFields.length)
        for (const field of imageFields) {
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

                        <form>
                            <div>
                                <input
                                    type="text"
                                    value={this.state.search}
                                    onChange={this.handleChange.bind(this, 'search')}
                                    placeholder="Search…"
                                />

                                <FaSearch />
                            </div>
                        </form>

                        <Link to="/blog/">
                            All Posts
                        </Link>
                    </div>
                </header>

                <main className="container">
                    {React.Children.map(children, child => cloneElement(child, childProps))}
                </main>
            </div>
        )
    }
}

export default App
