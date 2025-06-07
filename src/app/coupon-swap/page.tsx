"use client";
/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";
import { TabBar } from "../components/TabBar";

export default function CouponSwapPage() {
  const [voucherCode, setVoucherCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [myVouchers, setMyVouchers] = useState([
    { code: "VCHR-20250608-ABCD12", amount: 0.01, expiresAt: "2025-09-30", status: "UNUSED" },
    { code: "VCHR-20250610-XYZ999", amount: 0.02, expiresAt: "2025-10-31", status: "UNUSED" },
  ]);
  const [myCoupons, setMyCoupons] = useState([
    { code: "CPON-20250608-XYZ123", amount: 0.01, expiresAt: "2025-09-30", status: "ACTIVE" },
    { code: "CPON-20250501-EXPIRED", amount: 0, expiresAt: "2025-05-01", status: "EXPIRED" },
  ]);

  const handleRedeem = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      // 실제로는 fetch('/v1/vouchers/redeem', { method: 'POST', body: ... })
      // 아래는 목업
      await new Promise(res => setTimeout(res, 1200));
      if (!voucherCode.startsWith("VCHR-")) {
        setError("유효하지 않은 바우처 코드입니다.");
      } else {
        setResult({
          coupon_code: "CPON-20250608-XYZ123",
          balance_eth: 0.01,
          expires_at: "2025-09-30T23:59:59Z",
          status: "ACTIVE"
        });
      }
    } catch (e) {
      setError("서버 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div css={css`max-width: 480px; margin: 0 auto; padding: 24px; min-height: 100vh; background: #14151A; position: relative;`}>
      <h2 css={css`font-size: 28px; font-weight: 800; margin-bottom: 24px; color: #F2A003;`}>Coupon Swap</h2>
      {/* 프로모션/이벤트 영역 */}
      <div css={css`background: #23242A; border-radius: 14px; padding: 18px 18px 12px 18px; margin-bottom: 24px;`}>
        <h3 css={css`color: #F2A003; font-size: 18px; font-weight: 700; margin-bottom: 10px;`}>이벤트/프로모션</h3>
        {/* 추천인 코드 */}
        <div css={css`margin-bottom: 10px;`}>
          <input
            type="text"
            placeholder="추천인 코드를 입력하세요"
            css={css`width: 70%; padding: 10px; border-radius: 8px; border: 1.5px solid #23242A; background: #181920; color: #fff; font-size: 15px; margin-right: 8px;`}
          />
          <button css={css`background: #F2A003; color: #14151A; border: none; border-radius: 8px; font-weight: 700; font-size: 14px; padding: 8px 14px; cursor: pointer;`}>등록</button>
        </div>
        {/* 내 리퍼럴 코드/초대 */}
        <div css={css`margin-bottom: 10px;`}>
          내 추천코드: <b>REF-1234-ABCD</b>
          <button css={css`margin-left: 8px; background: #23242A; color: #F2A003; border: 1px solid #F2A003; border-radius: 8px; font-size: 13px; padding: 4px 10px; cursor: pointer;`}>복사</button>
          <button css={css`margin-left: 4px; background: #F2A003; color: #14151A; border: none; border-radius: 8px; font-size: 13px; padding: 4px 10px; cursor: pointer;`}>공유</button>
        </div>
        {/* 에어드랍/이벤트 */}
        <div css={css`margin-bottom: 10px;`}>
          <button css={css`background: #F2A003; color: #14151A; border: none; border-radius: 8px; font-weight: 700; font-size: 14px; padding: 8px 14px; cursor: pointer; margin-right: 8px;`}>에어드랍 대상자 확인</button>
          <button css={css`background: #F2A003; color: #14151A; border: none; border-radius: 8px; font-weight: 700; font-size: 14px; padding: 8px 14px; cursor: pointer;`}>이벤트 당첨자 조회</button>
        </div>
        {/* 광고/이벤트 참여 */}
        <div>
          <button css={css`background: #23242A; color: #F2A003; border: 1px solid #F2A003; border-radius: 8px; font-size: 14px; padding: 8px 14px; cursor: pointer;`}>광고/이벤트 참여하기</button>
        </div>
      </div>
      <div css={css`margin-bottom: 32px;`}>
        <h3 css={css`color: #F2A003; font-size: 18px; font-weight: 700; margin-bottom: 12px;`}>내 바우처</h3>
        <div css={css`display: flex; flex-direction: column; gap: 10px;`}>
          {myVouchers.map(v => (
            <div key={v.code} css={css`
              background: #23242A; border-radius: 12px; padding: 14px 18px; color: #fff; display: flex; justify-content: space-between; align-items: center;
            `}>
              <div>
                <div css={css`font-size: 16px; font-weight: 700;`}>{v.code}</div>
                <div css={css`font-size: 14px; color: #F2A003;`}>금액: {v.amount} ETH</div>
                <div css={css`font-size: 13px; color: #A0A0B0;`}>유효기간: {v.expiresAt}</div>
              </div>
              <button
                css={css`background: #F2A003; color: #14151A; border: none; border-radius: 8px; font-weight: 700; font-size: 14px; padding: 8px 16px; cursor: pointer;`}
                onClick={() => {/* 교환 로직 */}}
              >쿠폰으로 교환</button>
            </div>
          ))}
        </div>
      </div>
      <div css={css`margin-bottom: 32px;`}>
        <input
          type="text"
          value={voucherCode}
          onChange={e => setVoucherCode(e.target.value)}
          placeholder="바우처 코드를 입력하세요 (예: VCHR-20250608-ABCD12)"
          css={css`
            width: 100%; padding: 18px 20px; border-radius: 14px; border: 2px solid #23242A;
            background: #181920; color: #fff; font-size: 18px; margin-bottom: 12px;
            outline: none; transition: border 0.2s;
            &:focus { border-color: #F2A003; }
          `}
          disabled={loading}
        />
        <button
          onClick={handleRedeem}
          disabled={!voucherCode || loading}
          css={css`
            width: 100%; height: 54px; background: #F2A003; color: #14151A;
            font-weight: 800; font-size: 20px; border: none; border-radius: 14px;
            cursor: pointer; opacity: ${!voucherCode || loading ? 0.5 : 1};
            transition: opacity 0.2s;
          `}
        >
          {loading ? "교환 중..." : "쿠폰으로 교환하기"}
        </button>
      </div>
      {error && <div css={css`color: #EB5757; font-size: 16px; margin-bottom: 18px; text-align: center;`}>{error}</div>}
      {result && (
        <div css={css`background: #23242A; border-radius: 16px; padding: 24px 18px; color: #fff; text-align: center; margin-bottom: 24px;`}>
          <div css={css`font-size: 20px; font-weight: 700; color: #F2A003; margin-bottom: 10px;`}>쿠폰 발급 완료!</div>
          <div css={css`font-size: 17px; margin-bottom: 6px;`}>쿠폰 코드: <b>{result.coupon_code}</b></div>
          <div css={css`font-size: 17px; margin-bottom: 6px;`}>잔액: {result.balance_eth} ETH</div>
          <div css={css`font-size: 15px; color: #A0A0B0;`}>유효기간: {result.expires_at?.slice(0, 10)}</div>
          <div css={css`font-size: 15px; color: #A0A0B0; margin-top: 8px;`}>상태: {result.status}</div>
        </div>
      )}
      <div css={css`margin-top: 40px;`}>
        <h3 css={css`color: #F2A003; font-size: 18px; font-weight: 700; margin-bottom: 12px;`}>내 쿠폰</h3>
        <div css={css`display: flex; flex-direction: column; gap: 10px;`}>
          {myCoupons.map(c => (
            <div key={c.code} css={css`
              background: #23242A; border-radius: 12px; padding: 14px 18px; color: #fff; display: flex; justify-content: space-between; align-items: center;
              opacity: ${c.status === "ACTIVE" ? 1 : 0.5};
            `}>
              <div>
                <div css={css`font-size: 16px; font-weight: 700;`}>{c.code}</div>
                <div css={css`font-size: 14px; color: #F2A003;`}>잔액: {c.amount} ETH</div>
                <div css={css`font-size: 13px; color: #A0A0B0;`}>유효기간: {c.expiresAt}</div>
              </div>
              <div css={css`font-size: 13px; color: #A0A0B0; font-weight: 700;`}>{c.status === "ACTIVE" ? "활성" : "만료"}</div>
            </div>
          ))}
        </div>
      </div>
      <TabBar />
    </div>
  );
} 