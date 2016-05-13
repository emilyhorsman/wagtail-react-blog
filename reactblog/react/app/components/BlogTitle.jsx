import React from 'react'
import { Link } from 'react-router'

export default function BlogTitle({ id, title }) {
    return (
        <Link to={`/blog/${id}/`}>
            <h2>{title}</h2>
        </Link>
    )
}
