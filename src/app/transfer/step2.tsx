/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useWalletBalance } from "../../hooks/useWallet";
import {
  modalBgStyle,
  modalBoxStyle,
  sectionStyle,
  cardStyle,
  labelStyle,
  buttonGroupStyle
} from './styles';

interface TransferStep2Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  useCoupon: boolean;
  transferData: {
    from: string;
    to: string;
    amount: string;
    estimatedCoupon: string;
    couponId?: string;
    couponName?: string;
  };
}

// 주소 기반 간단한 identicon(블록리) SVG 생성 함수
function AddressIcon({ address, size = 28 }: { address: string, size?: number }) {
  const hash = Array.from(address).reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const color = `hsl(${hash % 360}, 70%, 60%)`;
  return (
    <svg width={size} height={size} style={{ borderRadius: '50%', marginRight: 8, background: '#181920' }}>
      <rect x="0" y="0" width={size} height={size} rx={size/2} fill={color} />
      <circle cx={size/2} cy={size/2} r={size/4} fill="#fff" fillOpacity="0.18" />
      <circle cx={size/2} cy={size/2} r={size/3} fill="#fff" fillOpacity="0.08" />
    </svg>
  );
}

// 최근 전송한 계좌 mock 데이터 (step1과 동일하게 유지)
const recentAddressList = [
  { address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', label: '내 메타마스크' },
  { address: '0x1234567890abcdef1234567890abcdef12345678', label: '친구 지갑' },
  { address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd', label: '회사 지갑' },
  { address: '0x9876543210abcdef9876543210abcdef98765432', label: '테스트 지갑' },
];

export const TransferStep2 = ({ isOpen, onClose, onConfirm, useCoupon, transferData }: TransferStep2Props) => {
  const { data: walletData, isLoading } = useWalletBalance();
  const couponList = [
    { id: 'c1', name: '웰컴 쿠폰', amount: 10000, expireAt: '2025-06-15' },
    { id: 'c2', name: '이벤트 쿠폰', amount: 5000, expireAt: '2024-12-31' },
    { id: 'c3', name: 'VIP 쿠폰', amount: 20000, expireAt: '2025-01-01' },
  ];
  const usedCoupon = couponList.find(c => c.id === transferData.couponId);
  
  if (!isOpen) return null;
  
  if (isLoading) {
    return (
      <div css={modalBgStyle}>
        <div css={modalBoxStyle}>
          <div css={sectionStyle}>
            <h2 css={css`font-size: 24px; font-weight: 800; color: #F2A003; margin-bottom: 24px; text-align: center; letter-spacing: -1px;`}>로딩 중...</h2>
          </div>
        </div>
      </div>
    );
  }

  const remainingEth = (parseFloat(walletData?.ethBalance || "0") - parseFloat(transferData.amount || "0")).toFixed(2);
  const remainingCoupon = (walletData?.couponBalance || 0) - parseInt(transferData.estimatedCoupon.replace(/[^0-9]/g, ""));

  return (
    <div css={modalBgStyle}>
      <div css={modalBoxStyle}>
        <div css={sectionStyle}>
          <h2 css={{ fontSize: 24, fontWeight: 800, color: "#F2A003", marginBottom: 24, textAlign: 'center', letterSpacing: -1 }}>이렇게 송금 될 거에요!</h2>
          
          {/* 전송 정보 */}
          <div css={sectionStyle}>
            {/* From */}
            <div css={sectionStyle}>
              <label css={labelStyle}>From</label>
              <div css={cardStyle}>
                {transferData.from && <AddressIcon address={transferData.from} size={22} />}
                <span css={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: 220,
                  display: 'block',
                }}>{transferData.from}</span>
              </div>
            </div>

            {/* To */}
            <div css={sectionStyle}>
              <label css={labelStyle}>To</label>
              <div css={cardStyle}>
                {transferData.to && <AddressIcon address={transferData.to} size={22} />}
                <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span css={{ fontWeight: 700, color: '#F2A003', marginBottom: 2 }}>
                    {(recentAddressList.find(a => a.address === transferData.to)?.label) || '사용자 지정'}
                  </span>
                  <span css={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: 220,
                    display: 'block',
                  }}>{transferData.to}</span>
                </div>
              </div>
            </div>

            {/* 보내는 금액 */}
            <div css={sectionStyle}>
              <label css={labelStyle}>보내는 금액</label>
              <div css={{ ...cardStyle, color: "#F2A003", fontSize: 17, fontWeight: 700 }}>{transferData.amount} ETH</div>
            </div>

            {/* 사용 쿠폰 */}
            <div css={sectionStyle}>
              <label css={labelStyle}>사용 쿠폰</label>
              <div css={{ ...cardStyle, color: transferData.couponName ? "#F2A003" : "#A0A0B0", fontSize: 17, fontWeight: 700 }}>{transferData.couponName ? `${transferData.couponName}${usedCoupon ? ` (${usedCoupon.amount.toLocaleString()}원)` : ''}` : '쿠폰 없음'}</div>
            </div>

            {/* 네트워크 수수료 (예상) */}
            <div css={sectionStyle}>
              <label css={labelStyle}>네트워크 수수료 (예상)</label>
              <div css={{ ...cardStyle, padding: "10px 16px", fontWeight: 700 }}>{transferData.estimatedCoupon || '계산 중...'}</div>
            </div>
            {/* 네트워크 속도 (예상) */}
            <div css={sectionStyle}>
              <label css={labelStyle}>네트워크 속도 (예상)</label>
              <div css={{ ...cardStyle, padding: "10px 16px", fontWeight: 700 }}>12초</div>
            </div>
          </div>

          {/* 버튼 그룹 */}
          <div css={buttonGroupStyle}>
            <button
              onClick={onClose}
              css={{
                flex: 1,
                padding: "14px 0",
                borderRadius: 12,
                border: "1.5px solid #F2A003",
                background: "transparent",
                color: "#F2A003",
                fontSize: 18,
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              취소
            </button>
            <button
              onClick={onConfirm}
              css={{
                flex: 1,
                padding: "14px 0",
                borderRadius: 12,
                border: "none",
                background: "#F2A003",
                color: "#14151A",
                fontSize: 18,
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              확인 (송금)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 