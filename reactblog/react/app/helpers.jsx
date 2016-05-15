import React from 'react'

export function highlight(text, value, raw = false) {
    const index = text.toLowerCase().indexOf(value.toLowerCase())
    if (index === -1) {
        return text
    }

    const pre  = text.substr(0, index)
    const hili = text.substr(index, value.length)
    const post = text.substr(index + value.length)

    if (raw) {
        return `${pre}<span class="highlight">${hili}</span>${post}`
    }

    return <span>{pre}<span className="highlight">{hili}</span>{post}</span>
}
