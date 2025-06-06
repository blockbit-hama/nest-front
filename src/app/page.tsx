"use client";
import Link from "next/link";
import { useState } from "react";
import { TransferStep1 } from "./transfer/step1";
import { useWalletList } from "../hooks/useWallet";

// 더 세련된 코인 SVG 아이콘들 (gradient, 입체감, 라인 등)
const BtcIcon = ({ size = 54 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="btcG" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fff7d1"/>
        <stop offset="100%" stopColor="#F7931A"/>
      </radialGradient>
    </defs>
    <circle cx="27" cy="27" r="27" fill="#1B1C22"/>
    <circle cx="27" cy="27" r="22" fill="url(#btcG)"/>
    <text x="27" y="36" textAnchor="middle" fontWeight="bold" fontSize={size * 0.45} fill="#fff" fontFamily="monospace" style={{filter:'drop-shadow(0 1px 2px #0008)'}}>₿</text>
  </svg>
);
const EthIcon = ({ size = 54 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ethG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B2BFFF"/>
        <stop offset="100%" stopColor="#627EEA"/>
      </linearGradient>
    </defs>
    <circle cx="27" cy="27" r="27" fill="#1B1C22"/>
    <circle cx="27" cy="27" r="22" fill="url(#ethG)"/>
    <polygon points="27,12 39,27 27,48 15,27" fill="#fff"/>
    <polygon points="27,12 27,36 39,27" fill="#B2BFFF"/>
    <polygon points="27,12 27,36 15,27" fill="#627EEA"/>
  </svg>
);
const UsdtIcon = ({ size = 54 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="usdtG" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#baffd7"/>
        <stop offset="100%" stopColor="#26A17B"/>
      </radialGradient>
    </defs>
    <circle cx="27" cy="27" r="27" fill="#1B1C22"/>
    <circle cx="27" cy="27" r="22" fill="url(#usdtG)"/>
    <text x="27" y="36" textAnchor="middle" fontWeight="bold" fontSize={size * 0.38} fill="#fff" fontFamily="monospace" style={{filter:'drop-shadow(0 1px 2px #0008)'}}>$</text>
  </svg>
);

// QR 코드 SVG 아이콘 (강조색)
const QrIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="8" height="8" rx="2" stroke="#F2A003" strokeWidth="2"/>
    <rect x="20" y="4" width="8" height="8" rx="2" stroke="#F2A003" strokeWidth="2"/>
    <rect x="4" y="20" width="8" height="8" rx="2" stroke="#F2A003" strokeWidth="2"/>
    <rect x="20" y="20" width="3" height="3" rx="1" stroke="#F2A003" strokeWidth="2"/>
    <rect x="25" y="25" width="3" height="3" rx="1" stroke="#F2A003" strokeWidth="2"/>
    <rect x="20" y="25" width="3" height="3" rx="1" stroke="#F2A003" strokeWidth="2"/>
    <rect x="25" y="20" width="3" height="3" rx="1" stroke="#F2A003" strokeWidth="2"/>
  </svg>
);

// 설정(톱니바퀴) SVG 아이콘
const SettingsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="10" stroke="#E0DFE4" strokeWidth="2"/>
    <path d="M14 10V14L16 16" stroke="#E0DFE4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 드롭다운(아래 화살표) SVG 아이콘
const DropdownIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 7L9 12L14 7" stroke="#E0DFE4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Coin 타입 정의
interface Coin {
  symbol: string;
  name: string;
  amount: string;
  usd: string;
  change: string;
  changeColor: string;
  subAmount: string;
  subUsd: string;
}

// 전송, 수신, 스왑 버튼용 세련된 아이콘
const SendIcon = ({ size = 22, color = '#14151A' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 8, verticalAlign: 'middle' }}>
    <path d="M4 12L20 12" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M14 6L20 12L14 18" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ReceiveIcon = ({ size = 22, color = '#14151A' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 8, verticalAlign: 'middle' }}>
    <path d="M12 4V20" stroke={color} strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M6 14L12 20L18 14" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const SwapIcon = ({ size = 32, color = '#F2A003' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 20H24M24 20L20 24M24 20L20 16" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 12H8M8 12L12 8M8 12L12 16" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Home() {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [useCoupon, setUseCoupon] = useState(true);
  const [selectedWalletId, setSelectedWalletId] = useState<string>("1");
  const [profileOpen, setProfileOpen] = useState(false);
  const [balanceType, setBalanceType] = useState<'잔액' | 'NFT' | '포인트'>('잔액');
  const balanceOptions = ['잔액', 'NFT', '포인트'] as const;
  const coinListMap: Record<'잔액' | 'NFT' | '포인트', Coin[]> = {
    '잔액': [
      {
        symbol: 'BTC', name: 'BTC', amount: '0.55514',
        usd: '$30.456', change: '+1.75%', changeColor: '#6FCF97',
        subAmount: '2.3514', subUsd: '$1,235.5'
      },
      {
        symbol: 'ETH', name: 'ETH', amount: '1.55514',
        usd: '$2.456', change: '-6.75%', changeColor: '#EB5757',
        subAmount: '0.5514', subUsd: '$135.5'
      },
      {
        symbol: 'USDT', name: 'USDT', amount: '9.99',
        usd: '$1.002', change: '-0.001%', changeColor: '#EB5757',
        subAmount: '99.5', subUsd: '$10'
      }
    ],
    'NFT': [
      { symbol: 'NFT', name: 'NFT', amount: '3', usd: '$0', change: '', changeColor: '#A0A0B0', subAmount: '', subUsd: 'NFT 3개' }
    ],
    '포인트': [
      { symbol: 'P', name: '포인트', amount: '100,000', usd: '$0', change: '', changeColor: '#A0A0B0', subAmount: '', subUsd: '100,000P' }
    ]
  };
  const coinList = coinListMap[balanceType];
  
  const { data: walletList, isLoading: isWalletListLoading } = useWalletList();
  const selectedWallet = walletList?.find(w => w.id === selectedWalletId);

  // 코인별 아이콘 매핑
  const getCoinIcon = (symbol: string, size: number = 54) => {
    if (symbol === 'BTC') return <BtcIcon size={size} />;
    if (symbol === 'ETH') return <EthIcon size={size} />;
    if (symbol === 'USDT') return <UsdtIcon size={size} />;
    return <span style={{ width: size, height: size, display: 'inline-block' }} />;
  };

  return (
    <div style={{ minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", background: "#14151A", position: "relative", fontFamily: "inherit" }}>
      {/* 탑바 */}
      <nav style={{ width: "100%", background: "rgba(20,21,26,0.98)", borderBottom: "1px solid #23242A", position: "sticky", top: 0, zIndex: 10, padding: "0 0 0 0" }}>
        <div style={{ maxWidth: 480, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 72, padding: "0 16px" }}>
          {/* 지갑 콤보박스 + 드롭다운 아이콘 */}
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <select
              value={selectedWalletId}
              onChange={e => setSelectedWalletId(e.target.value)}
              style={{
                background: "#23242A",
                color: "#E0DFE4",
                border: "none",
                borderRadius: 12,
                fontSize: 22,
                fontWeight: 700,
                padding: "12px 36px 12px 28px",
                outline: "none",
                minWidth: 140,
                appearance: 'none',
                MozAppearance: 'none',
                WebkitAppearance: 'none',
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
              }}
            >
              {isWalletListLoading ? (
                <option>로딩 중...</option>
              ) : (
                walletList?.map(wallet => (
                  <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
                ))
              )}
            </select>
            <div style={{ position: 'absolute', right: 12, pointerEvents: 'none' }}><DropdownIcon /></div>
          </div>
          {/* QR 코드 아이콘 버튼 (강조색) */}
          <button
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#23242A",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#F2A003",
              fontSize: 24,
              fontWeight: 700
            }}
            aria-label="QR 코드"
          >
            <QrIcon />
          </button>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 480, margin: "0 auto", padding: "0 0 80px 0" }}>
        {/* 내 ETH/달러/쿠폰 */}
        <div style={{ width: "100%", marginTop: 40, marginBottom: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: "#E0DFE4", letterSpacing: -1, textAlign: "center" }}>$1,234.56</div>
          <div style={{ fontSize: 18, color: "#A0A0B0", fontWeight: 600, marginBottom: 6 }}>3.00000 ETH</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 17, color: "#F2A003", fontWeight: 700, marginTop: 4 }}>10,000원 쿠폰</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', marginTop: 4 }}>
              <input type="checkbox" checked={useCoupon} onChange={() => setUseCoupon(v => !v)} style={{ accentColor: '#F2A003', width: 18, height: 18, margin: 0 }} />
              <span style={{ color: '#F2A003', fontWeight: 600, fontSize: 14 }}>사용</span>
            </label>
          </div>
          <div style={{ fontSize: 13, color: '#A0A0B0', marginTop: 2 }}>유효기간: 2025년 6월 15일</div>
        </div>
        {/* 전송/수신/스왑 버튼 */}
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 36, padding: '0 40px' }}>
          <button 
            style={{ width: "75%", border: "none", borderRadius: 24, background: "#F2A003", color: "#14151A", fontWeight: 700, fontSize: 22, height: 58, lineHeight: '58px', marginRight: 0, cursor: "pointer", boxShadow: "0 2px 8px rgba(242,160,3,0.08)", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, textAlign: 'center' }}
            onClick={() => setIsTransferModalOpen(true)}
          >전송</button>
          <button 
            style={{ width: "75%", border: "none", borderRadius: 24, background: "#E0DFE4", color: "#14151A", fontWeight: 700, fontSize: 22, height: 58, lineHeight: '58px', marginLeft: 0, cursor: "pointer", boxShadow: "0 2px 8px rgba(224,223,228,0.08)", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, textAlign: 'center' }}
          >수신</button>
          <button style={{ width: 58, height: 58, minWidth: 58, minHeight: 58, aspectRatio: '1/1', borderRadius: "50%", background: "#23242A", color: "#F2A003", border: "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700, marginLeft: 0, cursor: "pointer", boxShadow: "0 2px 8px rgba(242,160,3,0.08)", flexShrink: 0 }}>
            <SwapIcon color="#F2A003" />
          </button>
        </div>
        {/* 잔액 콤보박스 */}
        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
          <select
            value={balanceType}
            onChange={e => setBalanceType(e.target.value as '잔액' | 'NFT' | '포인트')}
            style={{
              background: "#23242A",
              color: "#E0DFE4",
              border: "none",
              borderRadius: 10,
              fontSize: 16,
              fontWeight: 600,
              padding: "8px 18px",
              outline: "none",
              minWidth: 90,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
            }}
          >
            {balanceOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        {/* 잔액 리스트 */}
        <div style={{ width: "100%", background: "none", borderRadius: 18, padding: 0, marginBottom: 20, display: "flex", flexDirection: "column", gap: 24 }}>
          {coinList.map((coin: Coin) => (
            <div key={coin.symbol} style={{ display: "flex", alignItems: "center", gap: 16, background: "#1B1C22", borderRadius: 16, padding: 18, margin: '0 0 0 0' }}>
              {getCoinIcon(coin.symbol, 54)}
              <div style={{ display: "flex", flexDirection: "column", minWidth: 60, marginRight: 8 }}>
                <span style={{ fontWeight: 500, fontSize: 22, color: "#E0DFE4", fontFamily: 'inherit', letterSpacing: -1 }}>{coin.name}</span>
                <span style={{ fontSize: 15, color: coin.changeColor, fontWeight: 400, fontFamily: 'inherit' }}>{coin.usd} {coin.change}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginLeft: "auto" }}>
                <span style={{ fontWeight: 500, fontSize: 22, color: "#E0DFE4", fontFamily: 'inherit', letterSpacing: -1 }}>{coin.amount}</span>
                <span style={{ fontSize: 15, color: "#A0A0B0", fontWeight: 400, fontFamily: 'inherit' }}>{coin.subUsd}</span>
              </div>
            </div>
          ))}
        </div>
        {/* D'Cent Wallet 워터마크 */}
        <div style={{ width: '100%', textAlign: 'center', marginBottom: 16 }}>
          <span style={{ fontSize: 32, fontWeight: 800, color: '#E0DFE4', opacity: 0.12, letterSpacing: 2 }}>D'Cent Wallet</span>
        </div>
      </main>

      {/* 하단 탭바 */}
      <nav style={{ position: "fixed", left: 0, right: 0, bottom: 0, height: 64, background: "#23242A", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 100, maxWidth: 480, margin: "0 auto", width: "100%" }}>
        {/* 홈 */}
        <button style={{ background: "none", border: "none", color: "#888A92", display: "flex", flexDirection: "column", alignItems: "center", flex: 1, cursor: "pointer" }}>
          <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12L14 4L24 12" stroke="#888A92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="6" y="12" width="16" height="10" rx="2" stroke="#888A92" strokeWidth="2"/>
          </svg>
        </button>
        {/* 지갑(강조) */}
        <button style={{ background: "none", border: "none", color: "#F2A003", display: "flex", flexDirection: "column", alignItems: "center", flex: 1, cursor: "pointer" }}>
          <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="8" width="22" height="12" rx="3" stroke="#F2A003" strokeWidth="2"/>
            <rect x="18" y="13" width="4" height="2" rx="1" fill="#F2A003"/>
          </svg>
        </button>
        {/* 스왑(회색) */}
        <button style={{ background: "none", border: "none", color: "#888A92", display: "flex", flexDirection: "column", alignItems: "center", flex: 1, cursor: "pointer" }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20L16 26L22 20" stroke="#888A92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 12L16 6L10 12" stroke="#888A92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {/* 설정(회색) */}
        <button style={{ background: "none", border: "none", color: "#888A92", display: "flex", flexDirection: "column", alignItems: "center", flex: 1, cursor: "pointer" }}>
          <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="10" stroke="#888A92" strokeWidth="2"/>
            <path d="M14 10V14L16 16" stroke="#888A92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </nav>

      {/* 전송 모달 */}
      <TransferStep1 
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        useCoupon={useCoupon}
      />
    </div>
  );
}
