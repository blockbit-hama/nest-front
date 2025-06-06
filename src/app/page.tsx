"use client";
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { TransferStep1 } from "./transfer/step1";
import { useWalletList } from "../hooks/useWallet";
import { CustomSelect } from "./components/CustomSelect";
import {
  topBarStyle,
  mainBoxStyle,
  cardStyle,
  tabBarStyle,
  mainSummaryBoxStyle,
  mainSummaryAmountStyle,
  mainSummaryEthStyle,
  mainSummaryCouponStyle,
  mainActionButtonGroupStyle,
  mainActionButtonStyle,
  mainActionSwapButtonStyle,
  balanceComboBoxStyle,
  balanceListStyle,
  balanceCardInnerStyle,
  balanceCardNameStyle,
  balanceCardUsdStyle,
  balanceCardAmountStyle,
  balanceCardSubUsdStyle,
  couponListStyle,
  couponCardStyle,
  couponCardNameStyle,
  couponCardExpireStyle,
  watermarkStyle,
  mainActionReceiveButtonStyle
} from './styles/homeStyles';

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
  const [balanceType, setBalanceType] = useState<'잔액' | 'NFT' | '쿠폰'>('잔액');
  const [selectedCouponId, setSelectedCouponId] = useState<string>("");
  const balanceOptions = ['잔액', 'NFT', '쿠폰'] as const;
  const coinListMap: Record<'잔액' | 'NFT' | '쿠폰', Coin[]> = {
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
    '쿠폰': [
      // 포인트 관련 데이터 완전히 삭제
    ]
  };
  const coinList = coinListMap[balanceType];
  
  const { data: walletList, isLoading: isWalletListLoading } = useWalletList();
  const selectedWallet = walletList?.find(w => w.id === selectedWalletId);

  const couponList = [
    { id: 'c1', name: '웰컴 쿠폰', amount: 10000, expireAt: '2025-06-15' },
    { id: 'c2', name: '이벤트 쿠폰', amount: 5000, expireAt: '2024-12-31' },
    { id: 'c3', name: 'VIP 쿠폰', amount: 20000, expireAt: '2025-01-01' },
  ];
  const filteredCouponList = couponList.filter(c => c.name !== '포인트');

  // 코인별 아이콘 매핑
  const getCoinIcon = (symbol: string, size: number = 54) => {
    if (symbol === 'BTC') return <BtcIcon size={size} />;
    if (symbol === 'ETH') return <EthIcon size={size} />;
    if (symbol === 'USDT') return <UsdtIcon size={size} />;
    return <span style={{ width: size, height: size, display: 'inline-block' }} />;
  };

  // 총 쿠폰 금액 계산
  const totalCouponAmount = couponList.reduce((sum, c) => sum + c.amount, 0);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [profileOpen]);

  return (
    <div css={css`min-height: 100vh; width: 100%; display: flex; flex-direction: column; background: "#14151A"; position: "relative"; font-family: "inherit";`}>
      {/* 탑바 */}
      <nav css={topBarStyle}>
        <div css={css`max-width: 480px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; height: 88px; padding: 0 16px;`}>
          {/* 지갑 콤보박스 + 드롭다운 아이콘 */}
          <div css={css`width: 260px;`}>
            <CustomSelect
              value={selectedWalletId}
              options={
                isWalletListLoading
                  ? [{ value: '', label: '로딩 중...' }]
                  : (walletList || []).map(w => ({ value: w.id, label: w.name }))
              }
              onChange={setSelectedWalletId}
              width={260}
              height={68}
              fontSize={24}
              padding="20px 56px 20px 28px"
              accentColor="#F2A003"
            />
          </div>
          {/* 프로필/로그인 드롭다운 버튼 */}
          <div ref={profileRef} css={css`position: relative;`}>
            <button
              css={css`
                width: 44px;
                height: 44px;
                border-radius: 50%;
                background: #23242A;
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: #F2A003;
                font-size: 24px;
                font-weight: 700;
                position: relative;
              `}
              aria-label="프로필"
              onClick={() => setProfileOpen((v) => !v)}
            >
              <QrIcon />
            </button>
            {profileOpen && (
              <div
                css={css`
                  position: absolute;
                  top: 54px;
                  right: 0;
                  min-width: 160px;
                  background: #23242A;
                  border-radius: 14px;
                  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18);
                  border: 2px solid #F2A003;
                  z-index: 1000;
                  padding: 8px 0;
                  display: flex;
                  flex-direction: column;
                  gap: 2px;
                `}
              >
                <Link
                  href="/login"
                  css={css`
                    padding: 18px 32px;
                    font-size: 20px;
                    font-weight: 700;
                    color: #E0DFE4;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: background 0.15s, color 0.15s;
                    display: block;
                    &:hover {
                      background: #1B1C22;
                      color: #F2A003;
                    }
                  `}
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  css={css`
                    padding: 18px 32px;
                    font-size: 20px;
                    font-weight: 700;
                    color: #E0DFE4;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: background 0.15s, color 0.15s;
                    display: block;
                    &:hover {
                      background: #1B1C22;
                      color: #F2A003;
                    }
                  `}
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main css={mainBoxStyle}>
        {/* 내 ETH/달러/쿠폰 */}
        <div css={css`
          width: 100%;
          max-width: 480px;
          margin: 8px auto 32px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        `}>
          <div css={css`font-size: 48px; font-weight: 800; color: #E0DFE4; letter-spacing: -1.5px; text-align: center; line-height: 1.1;`}>$1,234.56</div>
          <div css={css`font-size: 24px; color: #A0A0B0; font-weight: 700; margin-bottom: 4px;`}>3.00000 ETH</div>
          {/* 총 쿠폰 금액: 항상 전송/수신 버튼 위에만 노출 */}
          <div css={css`font-size: 24px; color: #F2A003; font-weight: 800; margin-top: 2px; margin-bottom: 18px;`}>
            총 쿠폰: {totalCouponAmount.toLocaleString()}원
          </div>
        </div>
        {/* 전송/수신/스왑 버튼 */}
        <div css={mainActionButtonGroupStyle}>
          <button 
            css={mainActionButtonStyle}
            onClick={() => setIsTransferModalOpen(true)}
          >전송</button>
          <button 
            css={mainActionReceiveButtonStyle}
          >수신</button>
          <button css={mainActionSwapButtonStyle}>
            <SwapIcon color="#F2A003" />
          </button>
        </div>
        {/* 잔액 콤보박스 */}
        <div css={balanceComboBoxStyle}>
          <CustomSelect
            value={balanceType}
            options={balanceOptions.map(opt => ({ value: opt, label: opt }))}
            onChange={v => setBalanceType(v as typeof balanceType)}
            width={120}
            height={40}
            fontSize={15}
            padding="8px 32px 8px 16px"
            accentColor="#F2A003"
            style={{ minWidth: 90 }}
          />
        </div>
        {/* 잔액 리스트 */}
        <div css={balanceListStyle}>
          {coinList.map((coin: Coin) => (
            <div key={coin.symbol} css={cardStyle} style={{ padding: '14px 24px', gap: 20 }}>
              {getCoinIcon(coin.symbol, 60)}
              <div css={balanceCardInnerStyle}>
                <span css={balanceCardNameStyle}>{coin.name}</span>
                <span css={css`${balanceCardUsdStyle}; color: ${coin.changeColor};`}>{coin.usd} {coin.change}</span>
              </div>
              <div css={css`display: flex; flex-direction: column; align-items: flex-end; margin-left: auto;`}>
                <span css={balanceCardAmountStyle}>{coin.amount}</span>
                <span css={balanceCardSubUsdStyle}>{coin.subUsd}</span>
              </div>
            </div>
          ))}
        </div>
        {/* 쿠폰 리스트: balanceType이 '쿠폰'일 때만 노출, 리스트 위에는 아무 정보도 없음 */}
        {balanceType === '쿠폰' && (
          <div css={couponListStyle}>
            {filteredCouponList.map(coupon => (
              <div key={coupon.id} css={couponCardStyle}>
                <div css={css`flex: 1;`}>
                  <div css={couponCardNameStyle}>{coupon.name} <span css={css`color: #F2A003; font-weight: 800;`}>{coupon.amount.toLocaleString()}원</span></div>
                  <div css={couponCardExpireStyle}>유효기간: {coupon.expireAt}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* D'Cent Wallet 워터마크 */}
        <div css={watermarkStyle}>
          <span>D'Cent Wallet</span>
        </div>
      </main>

      {/* 하단 탭바 */}
      <nav css={tabBarStyle}>
        {/* 홈 */}
        <button css={css`background: none; border: none; color: #888A92; display: flex; flex-direction: column; align-items: center; flex: 1; cursor: pointer;`}>
          <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12L14 4L24 12" stroke="#888A92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="6" y="12" width="16" height="10" rx="2" stroke="#888A92" strokeWidth="2"/>
          </svg>
        </button>
        {/* 지갑(강조) */}
        <button css={css`background: none; border: none; color: #F2A003; display: flex; flex-direction: column; align-items: center; flex: 1; cursor: pointer;`}>
          <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="8" width="22" height="12" rx="3" stroke="#F2A003" strokeWidth="2"/>
            <rect x="18" y="13" width="4" height="2" rx="1" fill="#F2A003"/>
          </svg>
        </button>
        {/* 스왑(회색) */}
        <button css={css`background: none; border: none; color: #888A92; display: flex; flex-direction: column; align-items: center; flex: 1; cursor: pointer;`}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 20L16 26L22 20" stroke="#888A92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 12L16 6L10 12" stroke="#888A92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {/* 설정(회색) */}
        <button css={css`background: none; border: none; color: #888A92; display: flex; flex-direction: column; align-items: center; flex: 1; cursor: pointer;`}>
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
