import React, { Component } from 'react'
import FaSearch from 'react-icons/fa/search'

class Search extends Component {
    onSubmit(event) {
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)} data-label="Search">
                <div>
                    <input
                        type="text"
                        value={this.props.search}
                        onChange={this.props.onChange}
                        placeholder="Search…"
                    />

                    <FaSearch />
                </div>
            </form>
        )
    }
}

export default Search
