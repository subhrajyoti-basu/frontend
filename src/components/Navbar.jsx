import React from 'react'
import { useRecoilState } from 'recoil';
import { WalletConnectedState } from '../GlobalState/atom';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ method }) {
    const [currentAccount, setCurrentAccount] = useRecoilState(WalletConnectedState);
    let history = useNavigate();
    return (
        <div className='px-8 lg:px-16'>
            <div className='max-w-7xl flex justify-between items-center h-[60px] mx-auto'>
                <h2 onClick={() => history("/")} className='cursor-pointer'>Herodotus</h2>
                {console.log('debug', currentAccount)}
                {!currentAccount ? <button onClick={method}>Connect Wallet</button> :
                    <div className='flex space-x-2'>
                        <button onClick={() => history(`/w/${currentAccount}`)}>Profile</button>
                        <button onClick={() => history("/editprofile")}>Edit Profile</button>
                        <button onClick={() => history("/upload")}>
                            Upload
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
