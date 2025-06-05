"use client";
import { useState } from "react";
import { TransferStep2 } from "./step2";

interface TransferStep1Props {
  isOpen: boolean;
  onClose: () => void;
  useCoupon: boolean;
}

export const TransferStep1 = ({ isOpen, onClose, useCoupon }: TransferStep1Props) => {
  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [showStep2, setShowStep2] = useState(false);
  const myAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
  const estimatedCoupon = "2,000원";

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
          from: myAddress,
          to: toAddress,
          amount,
          estimatedCoupon
        }}
      />
    );
  }

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 24,
        padding: 32,
        width: "90%",
        maxWidth: 420,
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.1)"
      }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1976d2", marginBottom: 24 }}>얼마를 보내실 건가요?</h2>
          
          {/* From 주소 */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 14, color: "#666", marginBottom: 8 }}>From:</label>
            <div style={{ 
              padding: "12px", 
              borderRadius: 12, 
              background: "#f5f5f5", 
              fontSize: 14,
              fontFamily: "monospace",
              color: "#333",
              boxSizing: "border-box",
              width: "100%"
            }}>
              {myAddress}
            </div>
          </div>

          {/* To 주소 입력 */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 14, color: "#666", marginBottom: 8 }}>To:</label>
            <input
              type="text"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              placeholder="받는 사람의 지갑 주소를 입력하세요"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 12,
                border: "2px solid #e0e0e0",
                fontSize: 14,
                fontFamily: "monospace",
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box"
              }}
              onFocus={(e) => e.target.style.borderColor = "#1976d2"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          {/* To (금액 입력) */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 14, color: "#666", marginBottom: 8 }}>전송할 ETH:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: 12,
                border: "2px solid #e0e0e0",
                fontSize: 16,
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box"
              }}
              onFocus={(e) => e.target.style.borderColor = "#1976d2"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          {/* 예상 쿠폰 사용량 */}
          {useCoupon && (
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 14, color: "#666", marginBottom: 8 }}>예상 쿠폰 사용량:</label>
              <div style={{ 
                padding: "12px", 
                borderRadius: 12, 
                background: "#e3f2fd", 
                color: "#1976d2",
                fontSize: 16,
                fontWeight: 600,
                boxSizing: "border-box",
                width: "100%"
              }}>
                {estimatedCoupon}
              </div>
            </div>
          )}

          {/* 버튼 그룹 */}
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: "12px 24px",
                borderRadius: 12,
                border: "1px solid #1976d2",
                background: "transparent",
                color: "#1976d2",
                fontSize: 16,
                fontWeight: 600,
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
                setShowStep2(true);
              }}
              style={{
                flex: 1,
                padding: "12px 24px",
                borderRadius: 12,
                border: "none",
                background: "#1976d2",
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
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