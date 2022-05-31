import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { arweave } from '../utils/arweave'
import { useRecoilState } from 'recoil';
import { WalletConnectedState } from '../GlobalState/atom';

export default function EditProfile() {
    let history = useNavigate();
    const [currentAccount, setCurrentAccount] = useRecoilState(WalletConnectedState);


    const [upload, setupload] = useState({
        name: '',
        institution: '',
        subjects: '',
        image: ''
    })
    const onChange = (event) => {
        setupload(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        const { arweaveWallet } = window;

        await arweaveWallet.connect(['ACCESS_ADDRESS', 'ACCESS_PUBLIC_KEY', 'SIGN_TRANSACTION']);

        let tx = await arweave.createTransaction({
            data: JSON.stringify(upload)
        })
        tx.addTag('type', 'profile');
        console.log(tx)
        console.log(arweaveWallet);
        await arweave.transactions.sign(tx);
        const uploader = await arweave.transactions.getUploader(tx);
        console.log(uploader)
        while (!uploader.isComplete) {
            await uploader.uploadChunk();
            history(`/w/${currentAccount}`)
            // console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
        }

    }
    return (
        <div className='max-w-7xl w-full flex justify-center items-center flex-1 mx-auto'>
            <form onSubmit={onSubmit} className='form w-5/6 space-y-6 flex flex-col items-center'>
                <input
                    type="text"
                    placeholder='Enter Name'
                    className='text-2xl text-center font-medium'
                    name='name'
                    onChange={onChange}
                />
                <input
                    type="text"
                    placeholder='Enter Institution Name'
                    className='text-2xl text-center font-medium'
                    name='institution'
                    onChange={onChange}
                />
                <input
                    type="text"
                    placeholder='Enter subjects by coma'
                    className='text-2xl text-center font-medium'
                    name='subjects'
                    onChange={onChange}
                />
                <input
                    type="text"
                    placeholder='Enter image url'
                    className='text-2xl text-center font-medium'
                    name='image'
                    onChange={onChange}
                />


                <button className='btn' type="submit">Update Profile</button>

            </form>
        </div>
    )
}
