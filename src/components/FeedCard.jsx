import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function FeedCard({ data, index }) {
  let history = useNavigate()
  // console.log('data card', data)
  return (
    <div className='py-3'>
      <a onClick={() => history((index + 1).toString())} className='cursor-pointer'>
        <h1>
          {data.title}
        </h1>
        <p className='leading-4 text-sm'>
          {data.description}
        </p>
      </a>
    </div>
  )
}
