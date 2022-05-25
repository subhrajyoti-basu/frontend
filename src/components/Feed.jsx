import React from 'react'
import FeedCard from './FeedCard'

export default function feed() {
    return (
        <div className='max-w-xl px-4 mt-6 divide-y mx-auto'>
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
        </div>
    )
}
