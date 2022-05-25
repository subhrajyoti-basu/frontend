import React from 'react'
import { useRecoilState } from 'recoil';
import { WalletConnectedState } from '../GlobalState/atom';
export default function Navbar({ method }) {
    const [currentAccount, setCurrentAccount] = useRecoilState(WalletConnectedState);
    return (
        <div className='px-8 lg:px-16'>
            <div className='max-w-7xl flex justify-between items-center h-[60px] mx-auto'>
                <h2>Herodotus</h2>
                {!currentAccount ? <button onClick={method}>Connect Wallet</button> :
                    <button>Upload</button>
                }
            </div>
        </div>
    )
}
