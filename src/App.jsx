import { useState } from 'react'
import TonConnect from '@tonconnect/sdk';
import { TonConnectUIProvider, TonConnectButton, useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';
import './App.css'

const WalletInfo = () => {
  const wallet = useTonWallet();

  return (
    wallet && (
      <div>
        <p>已连接钱包：{wallet.name}</p>
        <p>设备：{wallet.device.appName}</p>
      </div>
    )
  );
};

const PurchaseCard = () => {
  const [amount, setAmount] = useState('');
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  const handlePurchase = async () => {
    if (!wallet) {
      alert('请先连接钱包');
      return;
    }

    const nanoAmount = (parseFloat(amount) * 1e9).toString();

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 60,
      messages: [
        {
          address: 'UQBmtnBm7KT6ZtkwjSXS-qwTWmknhE-KLt9-p1VgQgw7_LUR', // 替换为接收支付的实际地址
          amount: nanoAmount,
        },
      ],
    };

    try {
      await tonConnectUI.sendTransaction(transaction);
      alert('点卡购买成功！');
    } catch (error) {
      console.error('交易失败', error);
      alert('交易失败，请重试');
    }
  };

  return (
    <div>
      <div>
        <h2>购买点卡</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="输入购买金额（TON）"
        />
      </div>
      <div>
        <button onClick={handlePurchase}>购买</button>
      </div>
    </div>
  );
};


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
          <WalletInfo />
          <PurchaseCard />
        </div>
      </div>
    </TonConnectUIProvider>
  )
}

export default App
