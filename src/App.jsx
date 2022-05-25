import './App.css'
import { Navbar, UserData, Feed } from './components'
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { WalletConnectedState } from './GlobalState/atom';
import { useRecoilState } from 'recoil';

function App() {
  const [currentAccount, setCurrentAccount] = useRecoilState(WalletConnectedState);

  //check if the wallet is connected or there is a wallet present
  const ifWalletisConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log('Install MetaMask')
      } else {
        console.log('we have the ethereum object', ethereum)
      }
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length != 0) {
        const account = accounts[0];
        console.log(account)
        setCurrentAccount(account)
      }
    } catch (error) {
      console.log('an error occured')
    }
  }

  // connect wallet to the webapp
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Install Metamask!')
        return
      }
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
      console.log('connected', accounts[0])

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    ifWalletisConnected();
  }, [])

  return (
    <div className="">
      <Navbar method={connectWallet} />
      <div className='lg:flex lg:justify-around max-w-7xl mx-auto'>
        <UserData />
        <Feed />
      </div>
    </div>
  )
}

export default App
