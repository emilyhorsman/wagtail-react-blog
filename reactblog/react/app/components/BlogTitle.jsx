import React from 'react'
import { Link } from 'react-router'

import { highlight } from '../helpers'

export default function BlogTitle({ id, ...props }) {
    const title = props.highlight ? highlight(props.title, props.highlight) : props.title

    return (
        <Link to={`/blog/${id}/`}>
            <h2>{title}</h2>
        </Link>
    )
}
