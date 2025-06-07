"use client";
/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import { TabBar } from "../components/TabBar";

interface Voucher {
  id: string;
  amount: number;
  expiresAt: string;
}

export default function VoucherPurchasePage() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState<"list" | "pay" | "result">("list");
  const [result, setResult] = useState<any>(null);
  const [myVouchers, setMyVouchers] = useState([
    { code: "VCHR-20250608-ABCD12", amount: 0.01, expiresAt: "2025-09-30", status: "UNUSED" },
    { code: "VCHR-20250610-XYZ999", amount: 0.02, expiresAt: "2025-10-31", status: "USED" },
    { code: "VCHR-20250501-EXPIRED", amount: 0.01, expiresAt: "2025-05-01", status: "EXPIRED" },
  ]);

  // 1. 바우처 상품 목록 조회 (목업)
  useEffect(() => {
    // 실제로는 fetch("/v1/vouchers/catalog")
    setTimeout(() => {
      setVouchers([
        { id: "v1", amount: 10000, expiresAt: "2025-06-30" },
        { id: "v2", amount: 30000, expiresAt: "2025-12-31" },
        { id: "v3", amount: 50000, expiresAt: "2026-06-30" },
      ]);
    }, 300);
  }, []);

  // 2. 결제 요청 (PG 연동은 실제로는 외부 창/redirect 등)
  const handlePay = () => {
    setStep("pay");
    // 실제 결제 연동 로직 필요
    setTimeout(() => {
      // 결제 성공 가정
      setResult({
        code: "VCHR-20250608-ABCD12",
        amount: vouchers.find(v => v.id === selected)?.amount,
        expiresAt: vouchers.find(v => v.id === selected)?.expiresAt,
      });
      setStep("result");
    }, 2000);
  };

  return (
    <div css={css`max-width: 480px; margin: 0 auto; padding: 24px; min-height: 100vh; background: #14151A; position: relative;`}>
      <h2 css={css`font-size: 28px; font-weight: 800; margin-bottom: 24px; color: #F2A003;`}>Voucher Purchase</h2>
      {step === "list" && (
        <>
          <div css={css`display: flex; flex-direction: column; gap: 16px;`}>
            {vouchers.map(v => (
              <div key={v.id} css={css`
                border: 2px solid ${selected === v.id ? "#F2A003" : "#23242A"};
                border-radius: 16px; padding: 18px 20px;
                background: #181920; color: #fff; cursor: pointer;
                display: flex; justify-content: space-between; align-items: center;
                transition: border 0.2s;
              `}
                onClick={() => setSelected(v.id)}
              >
                <div>
                  <div css={css`font-size: 20px; font-weight: 700;`}>{v.amount.toLocaleString()}원</div>
                  <div css={css`font-size: 14px; color: #F2A003;`}>유효기간: {v.expiresAt}</div>
                </div>
                {selected === v.id && <span css={css`color: #F2A003; font-weight: 700;`}>선택됨</span>}
              </div>
            ))}
          </div>
          <button
            css={css`
              margin-top: 32px; width: 100%; height: 54px;
              background: #F2A003; color: #14151A; font-weight: 800; font-size: 20px;
              border: none; border-radius: 14px; cursor: pointer;
              opacity: ${selected ? 1 : 0.5};
              transition: opacity 0.2s;
            `}
            disabled={!selected}
            onClick={handlePay}
          >
            결제하기
          </button>
        </>
      )}
      {step === "pay" && (
        <div css={css`text-align: center; margin-top: 60px; font-size: 20px; color: #F2A003;`}>결제 진행 중...</div>
      )}
      {step === "result" && result && (
        <div css={css`margin-top: 40px; text-align: center;`}>
          <div css={css`font-size: 22px; font-weight: 700; color: #F2A003; margin-bottom: 18px;`}>바우처 발급 완료!</div>
          <div css={css`font-size: 18px; color: #fff; margin-bottom: 8px;`}>코드: <b>{result.code}</b></div>
          <div css={css`font-size: 18px; color: #fff; margin-bottom: 8px;`}>금액: {result.amount?.toLocaleString()}원</div>
          <div css={css`font-size: 16px; color: #A0A0B0;`}>유효기간: {result.expiresAt}</div>
        </div>
      )}
      <div css={css`margin-top: 40px;`}>
        <h3 css={css`color: #F2A003; font-size: 18px; font-weight: 700; margin-bottom: 12px;`}>내 바우처</h3>
        <div css={css`display: flex; flex-direction: column; gap: 10px;`}>
          {myVouchers.map(v => (
            <div key={v.code} css={css`
              background: #23242A; border-radius: 12px; padding: 14px 18px; color: #fff; display: flex; justify-content: space-between; align-items: center;
              opacity: ${v.status === "UNUSED" ? 1 : 0.5};
            `}>
              <div>
                <div css={css`font-size: 16px; font-weight: 700;`}>{v.code}</div>
                <div css={css`font-size: 14px; color: #F2A003;`}>금액: {v.amount} ETH</div>
                <div css={css`font-size: 13px; color: #A0A0B0;`}>유효기간: {v.expiresAt}</div>
              </div>
              <div css={css`font-size: 13px; color: #A0A0B0; font-weight: 700;`}>{v.status === "UNUSED" ? "미사용" : v.status === "USED" ? "사용됨" : "만료"}</div>
            </div>
          ))}
        </div>
      </div>
      <TabBar />
    </div>
  );
} 