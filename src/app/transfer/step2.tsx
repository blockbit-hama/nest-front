"use client";
import { useWalletBalance } from "../../hooks/useWallet";

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
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(20,21,26,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}>
        <div style={{
          background: "#23242A",
          borderRadius: 24,
          padding: 32,
          width: "90%",
          maxWidth: 420,
          textAlign: "center",
          color: "#E0DFE4",
          fontSize: 20
        }}>
          로딩 중...
        </div>
      </div>
    );
  }

  const remainingEth = (parseFloat(walletData?.ethBalance || "0") - parseFloat(transferData.amount || "0")).toFixed(2);
  const remainingCoupon = (walletData?.couponBalance || 0) - parseInt(transferData.estimatedCoupon.replace(/[^0-9]/g, ""));

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(20,21,26,0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: "#23242A",
        borderRadius: 24,
        padding: 32,
        width: "90%",
        maxWidth: 420,
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        color: "#E0DFE4"
      }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#F2A003", marginBottom: 24, textAlign: 'center', letterSpacing: -1 }}>이렇게 송금 될 거에요!</h2>
          
          {/* 전송 정보 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* From */}
            <div>
              <label style={{ display: "block", fontSize: 15, color: "#A0A0B0", marginBottom: 8 }}>From</label>
              <div style={{ 
                padding: "12px",
                borderRadius: 12,
                background: "#1B1C22",
                fontSize: 15,
                fontFamily: "monospace",
                color: "#E0DFE4",
                boxSizing: "border-box",
                width: "100%",
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                display: 'flex', alignItems: 'center'
              }}>
                {transferData.from && <AddressIcon address={transferData.from} size={22} />}
                {transferData.from}
              </div>
            </div>

            {/* To */}
            <div>
              <label style={{ display: "block", fontSize: 15, color: "#A0A0B0", marginBottom: 8 }}>To</label>
              <div style={{ 
                padding: "12px",
                borderRadius: 12,
                background: "#1B1C22",
                fontSize: 15,
                fontFamily: "monospace",
                color: "#E0DFE4",
                boxSizing: "border-box",
                width: "100%",
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                display: 'flex', alignItems: 'center', gap: 8
              }}>
                {transferData.to && <AddressIcon address={transferData.to} size={22} />}
                <span style={{ fontWeight: 700, color: '#F2A003', marginRight: 8 }}>
                  {(recentAddressList.find(a => a.address === transferData.to)?.label) || '사용자 지정'}
                </span>
                {transferData.to}
              </div>
            </div>

            {/* 보내는 금액 */}
            <div>
              <label style={{ display: "block", fontSize: 15, color: "#A0A0B0", marginBottom: 8 }}>보내는 금액</label>
              <div style={{ 
                padding: "12px",
                borderRadius: 12,
                background: "#1B1C22",
                color: "#F2A003",
                fontSize: 17,
                fontWeight: 700,
                boxSizing: "border-box",
                width: "100%"
              }}>{transferData.amount} ETH</div>
            </div>

            {/* 사용 쿠폰 */}
            <div>
              <label style={{ display: "block", fontSize: 15, color: "#A0A0B0", marginBottom: 8 }}>사용 쿠폰</label>
              <div style={{ 
                padding: "12px",
                borderRadius: 12,
                background: "#1B1C22",
                color: transferData.couponName ? "#F2A003" : "#A0A0B0",
                fontSize: 17,
                fontWeight: 700,
                boxSizing: "border-box",
                width: "100%"
              }}>{transferData.couponName ? `${transferData.couponName}${usedCoupon ? ` (${usedCoupon.amount.toLocaleString()}원)` : ''}` : '쿠폰 없음'}</div>
            </div>

            {/* 네트워크 수수료 (예상) */}
            <div>
              <label style={{ display: "block", fontSize: 15, color: "#A0A0B0", marginBottom: 4 }}>네트워크 수수료 (예상)</label>
              <div style={{
                padding: "10px 16px",
                borderRadius: 10,
                background: "#1B1C22",
                color: "#fff",
                fontSize: 16,
                fontWeight: 700,
                boxSizing: "border-box",
                width: "100%"
              }}>{transferData.estimatedCoupon || '계산 중...'}</div>
            </div>
            {/* 네트워크 속도 (예상) */}
            <div style={{ marginBottom: 8 }}>
              <label style={{ display: "block", fontSize: 15, color: "#A0A0B0", marginBottom: 4 }}>네트워크 속도 (예상)</label>
              <div style={{
                padding: "10px 16px",
                borderRadius: 10,
                background: "#1B1C22",
                color: "#fff",
                fontSize: 16,
                fontWeight: 700,
                boxSizing: "border-box",
                width: "100%"
              }}>12초</div>
            </div>
          </div>

          {/* 버튼 그룹 */}
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            <button
              onClick={onClose}
              style={{
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
              style={{
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