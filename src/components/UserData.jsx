import React from 'react'

export default function UserData() {
    return (
        <div className='mt-4 lg:mt-10 mx-4'>
            <div className='flex flex-col items-center'>
                <div className='w-[100px] h-[100px] overflow-clip rounded-full'>
                    <img src="https://i.imgur.com/BSK7iEv.jpeg" alt="" />
                </div>
                <h1 className='text-xl'>
                    Kyle Harper
                </h1>
                <h3>
                    University of Okiahoma
                </h3>
                <div className='w-3/5 text-center'>
                    <h4>
                        Roman History, Economic History, Social History, Demography
                    </h4>
                </div>
            </div>
        </div>
    )
}
