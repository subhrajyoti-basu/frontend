import React from 'react'
import { useParams } from 'react-router-dom'
import { UserData } from '../components'
import Post from '../components/Post';

export default function Page() {
    const { pNo, id } = useParams();
    console.log(pNo)
    return (
        <div className='lg:flex lg:justify-around max-w-7xl w-full mx-auto'>
            <UserData id={id} />
            <Post id={id} pNo={pNo} />
        </div>
    )
}
