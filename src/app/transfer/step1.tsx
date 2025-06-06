"use client";
import { useState } from "react";
import { TransferStep2 } from "./step2";
import { useWalletBalance, useTransferEstimate, useWalletList } from "../../hooks/useWallet";
import { CustomSelect } from "../components/CustomSelect";

interface TransferStep1Props {
  isOpen: boolean;
  onClose: () => void;
  useCoupon: boolean;
}

// 주소 기반 간단한 identicon(블록리) SVG 생성 함수
function AddressIcon({ address, size = 28 }: { address: string, size?: number }) {
  // 해시 기반 색상/패턴 생성 (아주 단순화)
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

export const TransferStep1 = ({ isOpen, onClose, useCoupon }: TransferStep1Props) => {
  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [showStep2, setShowStep2] = useState(false);
  const [selectedWalletId, setSelectedWalletId] = useState("");
  const [selectedCouponId, setSelectedCouponId] = useState<string>("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  
  const { data: walletData, isLoading: isWalletLoading } = useWalletBalance();
  const { data: estimateData } = useTransferEstimate();
  const { data: walletList, isLoading: isWalletListLoading } = useWalletList();

  const balanceOptions = ['잔액', 'NFT', '쿠폰'] as const;

  const couponList = [
    { id: 'c1', name: '웰컴 쿠폰', amount: 10000, expireAt: '2025-06-15' },
    { id: 'c2', name: '이벤트 쿠폰', amount: 5000, expireAt: '2024-12-31' },
    { id: 'c3', name: 'VIP 쿠폰', amount: 20000, expireAt: '2025-01-01' },
  ];

  // 최근 전송한 계좌 mock 데이터
  const recentAddressList = [
    { address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', label: '내 메타마스크' },
    { address: '0x1234567890abcdef1234567890abcdef12345678', label: '친구 지갑' },
    { address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd', label: '회사 지갑' },
    { address: '0x9876543210abcdef9876543210abcdef98765432', label: '테스트 지갑' },
  ];

  if (!isOpen) return null;
  if (showStep2) {
    return (
      <TransferStep2
        isOpen={true}
        onClose={onClose}
        onConfirm={() => {
          console.log("전송 확정!");
          onClose();
        }}
        useCoupon={useCoupon}
        transferData={{
          from: walletData?.address || "",
          to: toAddress,
          amount,
          estimatedCoupon: useCoupon ? (estimateData?.estimatedCoupon || "0원") : "0원",
          couponId: selectedCouponId,
          couponName: couponList.find(c => c.id === selectedCouponId)?.name || ''
        }}
      />
    );
  }

  if (isWalletLoading) {
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
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#F2A003", marginBottom: 24, textAlign: 'center', letterSpacing: -1 }}>얼마를 보내실 건가요?</h2>
          {/* From 주소 */}
          <div style={{ marginBottom: 20 }}>
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
              textOverflow: 'ellipsis'
            }}>
              {walletData?.address}
            </div>
          </div>
          {/* To 주소 입력 */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 15, color: "#A0A0B0", marginBottom: 8 }}>To</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {toAddress && <AddressIcon address={toAddress} size={22} />}
              <input
                type="text"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                placeholder="받는 사람의 지갑 주소를 입력하세요"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 12,
                  border: "2px solid #23242A",
                  background: "#14151A",
                  color: "#E0DFE4",
                  fontSize: 15,
                  fontFamily: "monospace",
                  outline: "none",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box"
                }}
                onFocus={e => e.target.style.borderColor = "#F2A003"}
                onBlur={e => e.target.style.borderColor = "#23242A"}
              />
            </div>
            {/* 최근 전송 계좌 리스트 + 더 많이 버튼 */}
            <div style={{ marginTop: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
              {recentAddressList.slice(0, 2).map(item => (
                <div
                  key={item.address}
                  onClick={() => setToAddress(item.address)}
                  style={{
                    background: '#23242A',
                    borderRadius: 10,
                    padding: '10px 16px',
                    color: '#E0DFE4',
                    fontSize: 14,
                    fontFamily: 'monospace',
                    cursor: 'pointer',
                    border: '2px solid #23242A',
                    transition: 'border 0.2s',
                    minWidth: 0,
                    flex: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    display: 'flex', alignItems: 'center'
                  }}
                  onMouseOver={e => (e.currentTarget.style.border = '2px solid #F2A003')}
                  onMouseOut={e => (e.currentTarget.style.border = '2px solid #23242A')}
                  title={item.address}
                >
                  <AddressIcon address={item.address} size={22} />
                  <span style={{ fontWeight: 700, color: '#F2A003', marginRight: 8 }}>{item.label}</span>
                  {item.address.slice(0, 8)}...{item.address.slice(-6)}
                </div>
              ))}
              {/* 다른 주소 버튼 */}
              {recentAddressList.length > 2 && (
                <button
                  onClick={() => setShowAddressModal(true)}
                  style={{
                    background: '#23242A',
                    color: '#F2A003',
                    border: '2px solid #F2A003',
                    borderRadius: 10,
                    padding: '10px 18px',
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: 'pointer',
                    minWidth: 0,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  }}
                >다른 주소</button>
              )}
            </div>
            {/* 더 많이 모달 */}
            {showAddressModal && (
              <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(20,21,26,0.85)', zIndex: 1000,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <div style={{
                  background: '#23242A', borderRadius: 18, padding: 32, minWidth: 320, maxWidth: 400, width: '90%',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.3)', color: '#E0DFE4', maxHeight: 420, overflowY: 'auto'
                }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#F2A003', marginBottom: 18, textAlign: 'center' }}>최근 전송 계좌</div>
                  {recentAddressList.map(item => (
                    <div
                      key={item.address}
                      onClick={() => { setToAddress(item.address); setShowAddressModal(false); }}
                      style={{
                        background: '#1B1C22', borderRadius: 10, padding: '12px 18px', color: '#E0DFE4', fontSize: 15, fontFamily: 'monospace', cursor: 'pointer', border: '2px solid #23242A', marginBottom: 10, transition: 'border 0.2s', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center'
                      }}
                      onMouseOver={e => (e.currentTarget.style.border = '2px solid #F2A003')}
                      onMouseOut={e => (e.currentTarget.style.border = '2px solid #23242A')}
                      title={item.address}
                    >
                      <AddressIcon address={item.address} size={22} />
                      <span style={{ fontWeight: 700, color: '#F2A003', marginRight: 8 }}>{item.label}</span>
                      {item.address.slice(0, 8)}...{item.address.slice(-6)}
                    </div>
                  ))}
                  <button
                    onClick={() => setShowAddressModal(false)}
                    style={{ marginTop: 18, width: '100%', background: 'none', border: 'none', color: '#A0A0B0', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}
                  >닫기</button>
                </div>
              </div>
            )}
          </div>
          {/* To (금액 입력) */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 15, color: "#A0A0B0", marginBottom: 8 }}>전송할 ETH</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 12,
                border: "2px solid #23242A",
                background: "#14151A",
                color: "#E0DFE4",
                fontSize: 17,
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box"
              }}
              onFocus={e => e.target.style.borderColor = "#F2A003"}
              onBlur={e => e.target.style.borderColor = "#23242A"}
            />
            {/* 잔액 : ... ETH */}
            <div style={{ fontSize: 14, color: '#A0A0B0', marginTop: 6, textAlign: 'left' }}>
              잔액 : {walletData?.ethBalance ?? '-'} ETH
            </div>
          </div>
          {/* 네트워크 수수료 (예상) */}
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: "block", fontSize: 15, color: "#A0A0B0", marginBottom: 4 }}>네트워크 수수료 (예상)</label>
            <div style={{
              padding: "10px 16px",
              borderRadius: 10,
              background: "#1B1C22",
              color: "#F2A003",
              fontSize: 16,
              fontWeight: 700,
              boxSizing: "border-box",
              width: "100%"
            }}>{estimateData?.estimatedCoupon || '계산 중...'}</div>
          </div>
          {/* 쿠폰 선택 콤보박스 */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 15, color: "#A0A0B0", marginBottom: 8 }}>쿠폰 선택</label>
            <CustomSelect
              value={selectedCouponId}
              options={[
                { value: '', label: '쿠폰 선택 없음' },
                ...couponList.map(c => ({ value: c.id, label: `${c.name} (${c.amount.toLocaleString()}원)` }))
              ]}
              onChange={setSelectedCouponId}
              width={240}
              height={48}
              fontSize={17}
              padding="12px 48px 12px 20px"
              accentColor="#F2A003"
              placeholder="쿠폰을 선택하세요"
            />
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
              onClick={() => {
                if (!toAddress) {
                  alert("받는 사람의 주소를 입력해주세요.");
                  return;
                }
                if (!amount) {
                  alert("전송할 금액을 입력해주세요.");
                  return;
                }
                // 잔액 체크
                const currentBalance = parseFloat(walletData?.ethBalance || "0");
                const transferAmount = parseFloat(amount);
                if (transferAmount > currentBalance) {
                  alert("잔액이 부족합니다.");
                  return;
                }
                setShowStep2(true);
              }}
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
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 