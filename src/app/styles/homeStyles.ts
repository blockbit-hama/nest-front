import { css } from '@emotion/react';
import { flexCenterStyle, commonButtonStyle, commonCardStyle, commonModalStyle } from './common';

export const topBarStyle = css`
  width: 100%;
  background: rgba(20,21,26,0.98);
  border-bottom: 1px solid #23242A;
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0;
  height: 88px;
`;
export const mainBoxStyle = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 0 0 80px 0;
  min-height: 100vh;
`;
export const cardStyle = commonCardStyle;
export const tabBarStyle = css`
  position: fixed;
  left: 0; right: 0; bottom: 0;
  height: 64px;
  background: #23242A;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
`;
// 홈(메인) 전용 스타일 예시
export const mainSummaryBoxStyle = css`
  width: 100%;
  max-width: 480px;
  margin: 8px auto 32px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;
export const mainSummaryAmountStyle = css`
  font-size: 48px;
  font-weight: 800;
  color: #E0DFE4;
  letter-spacing: -1.5px;
  text-align: center;
  line-height: 1.1;
`;
export const mainSummaryEthStyle = css`
  font-size: 24px;
  color: #A0A0B0;
  font-weight: 700;
  margin-bottom: 4px;
`;
export const mainSummaryCouponStyle = css`
  font-size: 24px;
  color: #F2A003;
  font-weight: 800;
  margin-top: 2px;
  margin-bottom: 18px;
`;
// ... (이하 나머지 홈 전용 스타일도 같은 방식으로 추가)
// 이하 page.tsx에서 사용하는 주요 스타일 변수들을 같은 방식으로 추가 정의 (homeContainerStyle, topBarInnerStyle, walletComboBoxStyle, profileDropdownButtonStyle, profileDropdownMenuStyle, profileDropdownLinkStyle, mainSummaryBoxStyle, mainSummaryAmountStyle, mainSummaryEthStyle, mainSummaryCouponStyle, mainActionButtonGroupStyle, mainActionButtonStyle, mainActionSwapButtonStyle, balanceComboBoxStyle, balanceListStyle, balanceCardInnerStyle, balanceCardNameStyle, balanceCardUsdStyle, balanceCardAmountStyle, balanceCardSubUsdStyle, couponListStyle, couponCardStyle, couponCardNameStyle, couponCardExpireStyle, watermarkStyle 등) 