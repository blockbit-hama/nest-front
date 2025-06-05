"use client";
import Link from "next/link";
import { useState } from "react";
import { TransferStep1 } from "./transfer/step1";
import { useWalletList } from "../hooks/useWallet";

export default function Home() {
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [useCoupon, setUseCoupon] = useState(true);
  const [selectedWalletId, setSelectedWalletId] = useState<string>("1");
  
  const { data: walletList, isLoading: isWalletListLoading } = useWalletList();
  const selectedWallet = walletList?.find(w => w.id === selectedWalletId);

  return (
    <div style={{ minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", background: "linear-gradient(135deg, #f0f4f8 0%, #fff 100%)" }}>
      {/* 탑바 */}
      <nav style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.8)", borderBottom: "1px solid #eee", boxShadow: "0 2px 8px 0 rgba(0,0,0,0.03)", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "32px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Link href="/" style={{ fontSize: 38, fontWeight: 800, letterSpacing: -1, color: "#1976d2", textDecoration: "none" }}>
              D'CENT Wallet
            </Link>
            {/* 지갑 선택 콤보박스 */}
            <select
              value={selectedWalletId}
              onChange={(e) => setSelectedWalletId(e.target.value)}
              style={{
                padding: "8px 16px",
                fontSize: 16,
                borderRadius: 12,
                border: "2px solid #bbdefb",
                background: "#fff",
                color: "#1976d2",
                cursor: "pointer",
                outline: "none"
              }}
            >
              {isWalletListLoading ? (
                <option>로딩 중...</option>
              ) : (
                walletList?.map(wallet => (
                  <option key={wallet.id} value={wallet.id}>
                    {wallet.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Link href="/login">
              <button style={{fontSize: 18, borderRadius: 999, padding: "8px 20px", fontWeight: 600, background: "transparent", border: "1px solid #1976d2", color: "#1976d2", cursor: "pointer" }}>로그인</button>
            </Link>
            <Link href="/signup">
              <button style={{ fontSize: 18,borderRadius: 999, padding: "8px 20px", fontWeight: 600, background: "#1976d2", color: "#fff", border: 0, cursor: "pointer" }}>회원가입</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", padding: "64px 16px" }}>
          <div style={{ width: "100%", maxWidth: 600, borderRadius: 24, padding: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 40, boxShadow: "0 8px 32px 0 rgba(25, 118, 210, 0.08)", border: "2px solid #bbdefb", background: "#fff" }}>
            <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, color: "#1976d2", textAlign: "center", textShadow: "0 2px 8px #e3f2fd" }}>{selectedWallet?.name || "지갑을 선택해주세요"}</div>
            
            {/* 자산 정보 */}
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 24 }}>
              {/* ETH 잔액 */}
              <div style={{ padding: "24px", borderRadius: 16, background: "#e3f2fd", display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: 16, color: "#1976d2", fontWeight: 600 }}>내 ETH</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: "#1976d2" }}>3 ETH</div>
              </div>
              
              {/* 쿠폰 잔액 */}
              <div style={{ 
                padding: "24px", 
                borderRadius: 16, 
                background: useCoupon ? "#e3f2fd" : "#f5f5f5",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                position: "relative",
                transition: "background-color 0.2s"
              }}>
                <div style={{ 
                  position: "absolute",
                  top: 24,
                  right: 24,
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}>
                  <label 
                    onClick={() => setUseCoupon(!useCoupon)}
                    style={{ 
                      fontSize: 14,
                      color: useCoupon ? "#1976d2" : "#666",
                      cursor: "pointer",
                      userSelect: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 8
                    }}
                  >
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        setUseCoupon(!useCoupon);
                      }}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        border: `2px solid ${useCoupon ? "#1976d2" : "#999"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                        background: useCoupon ? "#1976d2" : "transparent",
                        cursor: "pointer"
                      }}
                    >
                      {useCoupon && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    쿠폰 사용
                  </label>
                </div>
                <div style={{ fontSize: 16, color: useCoupon ? "#1976d2" : "#666", fontWeight: 600, transition: "color 0.2s" }}>내 쿠폰</div>
                <div style={{ 
                  fontSize: 32, 
                  fontWeight: 800, 
                  color: useCoupon ? "#1976d2" : "#999",
                  transition: "color 0.2s",
                  opacity: useCoupon ? 1 : 0.7
                }}>10,000원</div>
                <div style={{
                  fontSize: 13,
                  color: useCoupon ? "#1976d2" : "#999",
                  opacity: 0.8,
                  transition: "color 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  position: "absolute",
                  right: 24,
                  bottom: 24
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.7 }}>
                    <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  2025년 9월 20일까지
                </div>
              </div>
              
              {/* 전송 버튼 */}
              <button 
                style={{ 
                  width: "100%", 
                  borderRadius: 16, 
                  fontWeight: 600, 
                  fontSize: 18, 
                  padding: "20px 0", 
                  background: "#1976d2", 
                  color: "#fff", 
                  border: 0, 
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
                  transition: "all 0.2s"
                }}
                onClick={() => setIsTransferModalOpen(true)}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(25, 118, 210, 0.3)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(25, 118, 210, 0.2)";
                }}
              >
                코인 보내기
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 전송 모달 */}
      <TransferStep1 
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        useCoupon={useCoupon}
      />
    </div>
  );
}
