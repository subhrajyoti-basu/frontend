import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { arweave } from '../utils/arweave'
import { useRecoilState } from 'recoil';
import { WalletConnectedState } from '../GlobalState/atom';


export default function Upload() {
    let history = useNavigate();
    const [currentAccount, setCurrentAccount] = useRecoilState(WalletConnectedState);
    const [upload, setupload] = useState({
        title: '',
        description: '',
        mdFile: ''
    })
    const [selectedFile, setSelectedFile] = useState('')

    const onChange = (event) => {
        setupload(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }
    const onUpload = (event) => {
        setSelectedFile(event.target.files[0])
        // console.log("file is here", event.target.files[0])
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        const { arweaveWallet } = window;

        await arweaveWallet.connect(['ACCESS_ADDRESS', 'ACCESS_PUBLIC_KEY', 'SIGN_TRANSACTION']);
        const account = await arweaveWallet.getActiveAddress()
        setCurrentAccount(account)
        // console.log(account);

        let reader = new FileReader()

        reader.readAsDataURL(selectedFile)
        reader.onload = async () => {
            // console.log("data result:", reader.result)


            let tx = await arweave.createTransaction({
                data: JSON.stringify({
                    title: upload.title,
                    description: upload.description,
                    mdFile: reader.result
                })
            })
            tx.addTag('type', 'researchpaper');
            // console.log(tx)
            // await arweaveWallet.sign(tx);
            // console.log(arweaveWallet);
            await arweave.transactions.sign(tx);
            const uploader = await arweave.transactions.getUploader(tx);
            // console.log(uploader)

            while (!uploader.isComplete) {
                await uploader.uploadChunk();
                // console.log(`${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`);
                history(`/w/${currentAccount}`)
            }
        }
    }
    return (
        <div className='max-w-7xl w-full flex justify-center items-center flex-1 mx-auto'>
            <form onSubmit={onSubmit} className='form w-5/6 space-y-6 flex flex-col items-center'>
                <input
                    type="text"
                    placeholder='Enter Title'
                    className='text-2xl text-center font-medium'
                    name='title'
                    onChange={onChange}
                />
                <textarea
                    placeholder='Enter Short Project Description...'
                    rows='5'
                    name='description'
                    onChange={onChange}
                ></textarea>
                <div>
                    <div className='upload-btn-wrapper'>
                        <button>Select MD</button>
                        <input
                            type='file'
                            name="mdFile"
                            onChange={onUpload} />
                    </div>
                </div>

                <button className='btn' type="submit">Mint Paper</button>

            </form>
        </div>
    )
}
