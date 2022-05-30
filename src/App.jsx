import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import './App.css';
import { Navbar } from './components';
import Post from './components/Post';
import { WalletConnectedState } from './GlobalState/atom';
import EditProfile from './pages/EditProfile';
import Home from './pages/Home';
import Page from './pages/Page';
import Upload from './pages/Upload';


function App() {
  const [currentAccount, setCurrentAccount] = useRecoilState(WalletConnectedState);

  //check if the wallet is connected or there is a wallet present
  const ifWalletisConnected = async () => {
    try {
      const { arweaveWallet } = window;
      if (!arweaveWallet) {
        // console.log('Install arweave')
      } else {
        // console.log('we have the ethereum object', arweaveWallet)
      }
      const account = await arweaveWallet.getActiveAddress();
      setCurrentAccount(account)
      // console.log(account)
    } catch (error) {
      console.log('an error occured', error)
    }
  }

  // connect wallet to the webapp
  const connectWallet = async () => {
    try {
      const { arweaveWallet } = window;

      if (!arweaveWallet) {
        alert('Install Arweave!')
        return
      }
      await arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION', 'ACCESS_PUBLIC_KEY'])
      const account = await arweaveWallet.getActiveAddress();
      setCurrentAccount(account);
      // console.log('connected', account)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setTimeout(
      ifWalletisConnected, 2000
    )

    // ifArweraveisConnected();
  }, [])

  return (
    <div className="h-screen flex flex-col">
      <BrowserRouter>
        <Navbar method={connectWallet} />

        <Routes>
          <Route path="/w/:id" element={<Home />} />
          <Route path='/w/:id/:pNo' element={<Page />} />

          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
