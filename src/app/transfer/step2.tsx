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
  };
}

export const TransferStep2 = ({ isOpen, onClose, onConfirm, useCoupon, transferData }: TransferStep2Props) => {
  const { data: walletData, isLoading } = useWalletBalance();
  
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
                textOverflow: 'ellipsis'
              }}>{transferData.from}</div>
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
                textOverflow: 'ellipsis'
              }}>{transferData.to}</div>
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

            {/* 남은 금액 */}
            <div>
              <label style={{ display: "block", fontSize: 15, color: "#A0A0B0", marginBottom: 8 }}>남은 금액</label>
              <div style={{ 
                padding: "12px",
                borderRadius: 12,
                background: "#1B1C22",
                color: "#fff",
                fontSize: 17,
                fontWeight: 700,
                boxSizing: "border-box",
                width: "100%"
              }}>{remainingEth} ETH</div>
            </div>

            {/* 사용 쿠폰 */}
            {useCoupon && (
              <>
                <div>
                  <label style={{ display: "block", fontSize: 15, color: "#A0A0B0", marginBottom: 8 }}>사용 쿠폰</label>
                  <div style={{ 
                    padding: "12px",
                    borderRadius: 12,
                    background: "#1B1C22",
                    color: "#F2A003",
                    fontSize: 16,
                    fontWeight: 600,
                    boxSizing: "border-box",
                    width: "100%"
                  }}>{transferData.estimatedCoupon}</div>
                </div>

                {/* 남은 쿠폰 */}
                <div>
                  <label style={{ display: "block", fontSize: 15, color: "#A0A0B0", marginBottom: 8 }}>남은 쿠폰</label>
                  <div style={{ 
                    padding: "12px",
                    borderRadius: 12,
                    background: "#1B1C22",
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 600,
                    boxSizing: "border-box",
                    width: "100%"
                  }}>{remainingCoupon.toLocaleString()}원</div>
                </div>
              </>
            )}
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