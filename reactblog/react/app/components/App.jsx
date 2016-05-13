import React, { Component } from 'react'
import { Link } from 'react-router'
import FaParagraph from 'react-icons/fa/paragraph'
import FaSearch from 'react-icons/fa/search'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: '',
        }
    }

    handleChange(key, event) {
        this.setState({
            [key]: event.target.value,
        })
    }

    render() {
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
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default App
