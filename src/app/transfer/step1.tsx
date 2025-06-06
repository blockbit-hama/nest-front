"use client";
import { useState } from "react";
import { TransferStep2 } from "./step2";
import { useWalletBalance, useTransferEstimate } from "../../hooks/useWallet";

interface TransferStep1Props {
  isOpen: boolean;
  onClose: () => void;
  useCoupon: boolean;
}

export const TransferStep1 = ({ isOpen, onClose, useCoupon }: TransferStep1Props) => {
  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [showStep2, setShowStep2] = useState(false);
  
  const { data: walletData, isLoading: isWalletLoading } = useWalletBalance();
  const { data: estimateData } = useTransferEstimate();

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
          estimatedCoupon: useCoupon ? (estimateData?.estimatedCoupon || "0원") : "0원"
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
          </div>
          {/* 예상 쿠폰 사용량 */}
          {useCoupon && (
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 15, color: "#A0A0B0", marginBottom: 8 }}>예상 쿠폰 사용량</label>
              <div style={{ 
                padding: "12px", 
                borderRadius: 12, 
                background: "#1B1C22", 
                color: "#F2A003",
                fontSize: 16,
                fontWeight: 600,
                boxSizing: "border-box",
                width: "100%"
              }}>
                {estimateData?.estimatedCoupon || "계산 중..."}
              </div>
            </div>
          )}
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
              송금하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 