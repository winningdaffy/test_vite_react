import { useState } from 'react'
import TonConnect from '@tonconnect/sdk';
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';
import './App.css'

function App() {
  const [message, setMessage] = useState('Wallet demo')

  return (
    <TonConnectUIProvider manifestUrl="/tonconnect-manifest.json">
      <div className="app-container">
        <h1>{message}</h1>
        <div className="content">
          <TonConnectButton />
          {/* <button onClick={() => setMessage('你点击了按钮！')}>
            点击我
          </button> */}
          <p>这是一个连接TON Connect的demo</p>
        </div>
      </div>
    </TonConnectUIProvider>
  )
}

export default App
