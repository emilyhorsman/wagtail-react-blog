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
        }
    }

    handleChange(key, event) {
        this.setState({
            [key]: event.target.value,
        })
    }

    handlePagesIndex(response) {
        this.setState({
            loading: this.state.loading - 1,
            pages: this.state.pages.concat(response.data.pages),
        })
    }

    incrementLoading() {
        this.setState({
            loading: this.state.loading + 1,
        })
    }

    render() {
        const { children } = this.props
        const childProps = {
            search: this.state.search,
            handlePagesIndex: this.handlePagesIndex.bind(this),
            incrementLoading: this.incrementLoading.bind(this),
            pages: this.state.pages,
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
