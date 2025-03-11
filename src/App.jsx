import { useState } from 'react'
import TonConnect from '@tonconnect/sdk';
import { TonConnectUIProvider, TonConnectButton, useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';
import './App.css'

const Header = () => {
  return (<header>
    <div>
      <TonConnectButton />
    </div>
  </header>
  )
}

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
    <TonConnectUIProvider
      manifestUrl="https://test-vite-react-git-main-winningdaffys-projects.vercel.app//tonconnect-manifest.json"
      // uiPreferences={{ theme: THEME.DARK }}
      // walletsListConfiguration={{
      //   includeWallets: [
      //     {
      //       appName: "telegram-wallet",
      //       name: "Wallet",
      //       imageUrl: "https://wallet.tg/images/logo-288.png",
      //       aboutUrl: "https://wallet.tg/",
      //       universalLink: "https://t.me/wallet?attach=wallet",
      //       bridgeUrl: "https://bridge.ton.space/bridge",
      //       platforms: ["ios", "android", "macos", "windows", "linux"]
      //     },
      //     {
      //       appName: "tonwallet",
      //       name: "TON Wallet",
      //       imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
      //       aboutUrl: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
      //       universalLink: "https://wallet.ton.org/ton-connect",
      //       jsBridgeKey: "tonwallet",
      //       bridgeUrl: "https://bridge.tonapi.io/bridge",
      //       platforms: ["chrome", "android"]
      //     },
      //     {
      //       appName: "nicegramWallet",
      //       name: "Nicegram Wallet",
      //       imageUrl: "https://static.nicegram.app/icon.png",
      //       aboutUrl: "https://nicegram.app",
      //       universalLink: "https://nicegram.app/tc",
      //       deepLink: "nicegram-tc://",
      //       jsBridgeKey: "nicegramWallet",
      //       bridgeUrl: "https://tc.nicegram.app/bridge",
      //       platforms: ["ios", "android", "macos", "windows", "linux"]
      //     },
      //     {
      //       appName: "tokenpocket",
      //       name: "TokenPocket",
      //       imageUrl: "https://hk.tpstatic.net/logo/tokenpocket.png",
      //       aboutUrl: "https://www.tokenpocket.pro",
      //       universalLink: "https://tp-lab.tptool.pro/ton-connect/",
      //       jsBridgeKey: "tokenpocket",
      //       bridgeUrl: "https://ton-connect.mytokenpocket.vip/bridge",
      //       platforms: ["ios", "android", "macos", "windows", "linux"]
      //     },
      //     {
      //       appName: "dewallet",
      //       name: "DeWallet",
      //       imageUrl: "https://raw.githubusercontent.com/delab-team/manifests-images/main/WalletAvatar.png",
      //       aboutUrl: "https://delabwallet.com",
      //       universalLink: "https://t.me/dewallet?attach=wallet",
      //       bridgeUrl: "https://bridge.dewallet.pro/bridge",
      //       platforms: ["ios", "android", "macos", "windows", "linux"]
      //     },
      //     {
      //       appName: "cdcTonWallet",
      //       name: "Crypto.com DeFi Wallet",
      //       imageUrl: "https://apro-ncw-api-file.crypto.com/wallet/logo",
      //       aboutUrl: "https://crypto.com/defi-wallet",
      //       universalLink: "https://wallet.crypto.com/deeplink/ton-connect",
      //       deepLink: "dfw://",
      //       jsBridgeKey: "cdcTonWallet",
      //       bridgeUrl: "https://wallet.crypto.com/sse/tonbridge",
      //       platforms: ["ios", "android", "chrome"]
      //     },
      //     {
      //       appName: "tobi",
      //       name: "Tobi",
      //       imageUrl: "https://app.tobiwallet.app/icons/logo.png",
      //       aboutUrl: "https://tobi.fun",
      //       universalLink: "https://t.me/TobiCopilotBot?attach=wallet",
      //       bridgeUrl: "https://ton-bridge.tobiwallet.app/bridge",
      //       platforms: ["ios", "android", "macos", "windows", "linux"]
      //     },
      //     {
      //       appName: "trustwalletTon",
      //       name: "Trust",
      //       imageUrl: "https://assets-cdn.trustwallet.com/dapps/trust.logo.png",
      //       aboutUrl: "https://trustwallet.com/about-us",
      //       bridgeUrl: "https://tonconnect.trustwallet.com/bridge",
      //       universalLink: "https://link.trustwallet.com/tc",
      //       deepLink: "trust://ton-connect",
      //       jsBridgeKey: "trustwalletTon",
      //       platforms: ["chrome", "ios", "android"]
      //     },
      //     {
      //       appName: "bitgetWalletLite",
      //       name: "Bitget Wallet Lite",
      //       imageUrl: "https://raw.githubusercontent.com/bitgetwallet/download/main/logo/png/bitget_wallet_lite_logo.png",
      //       aboutUrl: "https://web3.bitget.com",
      //       universalLink: "https://t.me/BitgetWallet_TGBot?attach=wallet",
      //       bridgeUrl: "https://ton-connect-bridge.bgwapi.io/bridge",
      //       platforms: ["ios", "android", "macos", "windows", "linux"]
      //     },
      //     {
      //       appName: "onekey",
      //       name: "OneKey",
      //       imageUrl: "https://common.onekey-asset.com/logo/onekey-x288.png",
      //       aboutUrl: "https://onekey.so",
      //       jsBridgeKey: "onekeyTonWallet",
      //       platforms: ["chrome"]
      //     },
      //     {
      //       appName: "tomoWallet",
      //       name: "Tomo Wallet",
      //       imageUrl: "https://pub.tomo.inc/logo.png",
      //       aboutUrl: "https://www.tomo.inc/",
      //       universalLink: "https://t.me/tomowalletbot?attach=wallet",
      //       bridgeUrl: "https://go-bridge.tomo.inc/bridge",
      //       platforms: ["ios", "android", "macos", "windows", "linux"]
      //     },
      //     {
      //       appName: "hpyTonWallet",
      //       name: "HyperPay Wallet",
      //       imageUrl: "https://onchain-oss.hyperpay.online/images/logo.png",
      //       aboutUrl: "https://www.hyperpay.tech",
      //       universalLink: "https://www.hyperpay.tech/download&deeplink=hyperpay://web3/wallet/tonconnect",
      //       jsBridgeKey: "hpyTonWallet",
      //       bridgeUrl: "https://onchain-wallet.hyperpay.online/bridge",
      //       platforms: ["ios", "android", "macos", "windows", "linux"]
      //     },
      //     {
      //       appName: "unstoppable",
      //       name: "Unstoppable Wallet",
      //       imageUrl: "https://unstoppable.money/logo288.png",
      //       aboutUrl: "https://unstoppable.money/",
      //       universalLink: "https://unstoppable.money/ton-connect",
      //       bridgeUrl: "https://bridge.unstoppable.money/bridge",
      //       platforms: ["ios", "android", "macos", "windows", "linux"]
      //     },
      //     {
      //       appName: "foxwallet",
      //       name: "FoxWallet",
      //       imageUrl: "https://hc.foxwallet.com/img/logo.png",
      //       aboutUrl: "https://foxwallet.com/",
      //       universalLink: "https://link.foxwallet.com/tc",
      //       jsBridgeKey: "foxwallet",
      //       bridgeUrl: "https://connect.foxwallet.com/ton/bridge",
      //       platforms: ["ios", "android", 'macos', 'windows', 'linux']
      //     },
      //     {
      //       appName: "jambo",
      //       name: "Jambo",
      //       imageUrl: "https://cdn-prod.jambotechnology.xyz/content/jambo_288x288_02da416a6c.png",
      //       aboutUrl: "https://www.jambo.technology/",
      //       deepLink: "jambotc://",
      //       universalLink: "https://jambophone.xyz/",
      //       bridgeUrl: "https://bridge.tonapi.io/bridge",
      //       jsBridgeKey: "jambowallet",
      //       platforms: ['android', 'macos', 'windows', 'linux']
      //     },
      //     {
      //       appName: "Gate.io wallet",
      //       name: "Gate.io wallet",
      //       imageUrl: "https://gimg2.gateimg.com/tgwallet/1730688473495507406-Gatewallet.png",
      //       aboutUrl: "https://www.gate.io",
      //       universalLink: "https://t.me/gateio_wallet_bot?attach=wallet",
      //       bridgeUrl: "https://dapp.gateio.services/tonbridge_api/bridge/v1",
      //       platforms: ["ios", "android", "linux", "windows", "macos"]
      //     },
      //     {
      //       appName: "coin98",
      //       name: "Coin98 ",
      //       imageUrl: "https://coin98.s3.ap-southeast-1.amazonaws.com/SocialLogo/ninetyeight.png",
      //       aboutUrl: "https://docs.coin98.com",
      //       deepLink: "coin98://ton-connect",
      //       bridgeUrl: "https://ton-bridge.coin98.tech/bridge",
      //       platforms: ["ios", "android"],
      //       universalLink: "https://coin98.com/ton-connect"
      //     },
      //     {
      //       appName: "coin98TelegramWallet",
      //       name: "Coin98 Telegram Wallet",
      //       imageUrl: "https://coin98.s3.ap-southeast-1.amazonaws.com/SocialLogo/ninetyeight.png",
      //       aboutUrl: "https://docs.coin98.com",
      //       universalLink: "https://t.me/Coin98_bot?attach=wallet",
      //       bridgeUrl: "https://ton-bridge.coin98.tech/bridge",
      //       platforms: ["ios", "android", "macos", "windows", "linux"]
      //     },
      //     {
      //       appName: "miraiapp-tg",
      //       name: "Mirai Mini App",
      //       imageUrl: "https://cdn.mirailabs.co/miraihub/miraiapp-tg-icon-288.png",
      //       aboutUrl: "https://mirai.app",
      //       universalLink: "https://t.me/MiraiAppBot?attach=wallet",
      //       bridgeUrl: "https://bridge.mirai.app",
      //       platforms: ["ios", "android", "macos", "windows", "linux"]
      //     },
      //     {
      //       appName: "miraiapp",
      //       name: "Mirai App",
      //       imageUrl: "https://cdn.mirailabs.co/miraihub/miraiapp-icon-288.png",
      //       aboutUrl: "https://mirai.app",
      //       universalLink: "https://go.miraiapp.io/ton-connect",
      //       deepLink: "miraiapp://",
      //       bridgeUrl: "https://bridge.tonapi.io/bridge",
      //       jsBridgeKey: "miraiapp",
      //       platforms: ["ios", "android", "chrome", "firefox"]
      //     },
      //     {
      //       appName: 'nestwallet',
      //       name: 'Nest Wallet',
      //       imageUrl: 'https://storage.googleapis.com/nestwallet-public-resource-bucket/logo/nest_logo_square.png',
      //       aboutUrl: 'https://www.nestwallet.xyz',
      //       jsBridgeKey: 'nestwallet',
      //       platforms: ['chrome']
      //     },
      //     {
      //       appName: "Architec.ton",
      //       name: "Architec.ton",
      //       imageUrl: "https://raw.githubusercontent.com/Architec-Ton/wallet-tma/refs/heads/dev/public/images/arcwallet_logo.png",
      //       aboutUrl: "https://architecton.tech",
      //       universalLink: "https://t.me/architec_ton_bot?attach=wallet",
      //       bridgeUrl: "https://tc.architecton.su/bridge",
      //       platforms: ["ios", "android", "macos", "windows", "linux"]
      //     },
      //     {
      //       appName: "uxuyWallet",
      //       name: "UXUY Wallet",
      //       imageUrl: "https://raw.githubusercontent.com/uxuycom/uxuy-docsite/main/static/assets/UXUYWallet-logo/UXUYWallet_logo_circle.svg",
      //       aboutUrl: "https://docs.uxuy.com",
      //       universalLink: "https://t.me/UXUYbot?attach=wallet",
      //       bridgeUrl: "https://bridge.uxuy.me/bridge",
      //       platforms: ["ios", "android", "macos", "windows", "linux"]
      //     },
      //     {
      //       appName: "tonflow",
      //       name: "TONFLOW",
      //       imageUrl: "https://tonflow.app/assets/images/tonflow_ico_256.png",
      //       aboutUrl: "https://tonflow.app",
      //       universalLink: "https://tonflow.app/ton-connect",
      //       deepLink: "tonflow-tc://",
      //       bridgeUrl: "https://bridge.tonapi.io/bridge",
      //       jsBridgeKey: "tonflow",
      //       platforms: ["windows", "linux", "macos", "chrome"]
      //     },
      //     {
      //       appName: 'Tonkeeper',
      //       name: 'TonkeeperWeb',
      //       imageUrl: 'https://raw.githubusercontent.com/tonkeeper/tonkeeper-web/0f197474c57937787608697e794ef2b20a62f0d4/apps/twa/public/logo-128x128.png',
      //       aboutUrl: 'https://wallet.tonkeeper.com/',
      //       universalLink: 'https://wallet.tonkeeper.com/ton-connect',
      //       bridgeUrl: "https://bridge.tonapi.io/bridge",
      //       platforms: ["ios", "android", "macos", "windows", "linux"]
      //     }
      //   ]
      // }}
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/daffy_test_bot/test_my_app'
      }}
    >
      <div className="app-container">
        <Header />
        <h1>{message}</h1>
        <div className="content">
          <WalletInfo />
          <PurchaseCard />
        </div>
      </div>
    </TonConnectUIProvider>
  )
}

export default App
