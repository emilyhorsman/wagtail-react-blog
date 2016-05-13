import 'babel-polyfill'

import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, IndexRedirect, Route, browserHistory } from 'react-router'

import App from './components/App'
import BlogIndex from './components/BlogIndex'
import BlogPage from './components/BlogPage'

class NotFound extends Component {
    render() {
        return <h1>404: Error Not Found</h1>
    }
}

render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="blog" />

            <Route path="blog" component={BlogIndex} />
            <Route path="blog/:postId" component={BlogPage} />

            <Route path="*" component={NotFound} />
        </Route>
    </Router>
, document.getElementById('app'))
