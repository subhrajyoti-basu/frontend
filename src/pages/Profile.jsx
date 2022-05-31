import React from 'react'
import { useParams } from 'react-router-dom'
import { UserData, Feed } from '../components'

export default function Profile() {
    const { id } = useParams();
    // console.log(id)
    return (
        <div className='lg:flex lg:justify-around max-w-7xl w-full mx-auto'>
            <UserData id={id} />
            <Feed id={id} />
        </div>
    )
}
