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

export const mainActionButtonGroupStyle = css`
  width: calc(100% - 32px);
  max-width: 432px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 56px;
  padding: 0;
`;
export const mainActionButtonStyle = css`
  width: 32%;
  min-width: 0;
  border: none;
  border-radius: 24px;
  background: #F2A003;
  color: #14151A;
  font-weight: 700;
  font-size: 22px;
  height: 58px;
  line-height: 58px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(242,160,3,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  text-align: center;
`;
export const mainActionReceiveButtonStyle = css`
  width: 32%;
  min-width: 0;
  border: none;
  border-radius: 24px;
  background: #E0DFE4;
  color: #14151A;
  font-weight: 700;
  font-size: 22px;
  height: 58px;
  line-height: 58px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(224,223,228,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  text-align: center;
`;
export const mainActionSwapButtonStyle = css`
  width: 58px;
  height: 58px;
  min-width: 58px;
  min-height: 58px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background: #23242A;
  color: #F2A003;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(242,160,3,0.08);
  flex-shrink: 0;
  margin-left: 0;
`;
export const balanceComboBoxStyle = css`
  width: 120px;
  margin-left: auto;
  margin-bottom: 10px;
  margin-right: 16px;
`;
export const balanceListStyle = css`
  width: 100%;
  max-width: 480px;
  background: none;
  border-radius: 20px;
  padding: 0;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
export const balanceCardInnerStyle = css`
  display: flex;
  flex-direction: column;
  min-width: 64px;
  margin-right: 12px;
`;
export const balanceCardNameStyle = css`
  font-weight: 600;
  font-size: 26.5px;
  color: #E0DFE4;
  font-family: inherit;
  letter-spacing: -1.5px;
`;
export const balanceCardUsdStyle = css`
  font-size: 19px;
  font-weight: 500;
  font-family: inherit;
`;
export const balanceCardAmountStyle = css`
  font-weight: 700;
  font-size: 30.5px;
  color: #E0DFE4;
  font-family: inherit;
  letter-spacing: -1.5px;
`;
export const balanceCardSubUsdStyle = css`
  font-size: 17px;
  color: #A0A0B0;
  font-weight: 500;
  font-family: inherit;
`;
export const couponListStyle = css`
  width: calc(100% - 32px);
  max-width: 432px;
  margin-bottom: 16px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const couponCardStyle = css`
  display: flex;
  align-items: center;
  background: #1B1C22;
  border-radius: 12px;
  padding: 14px 16px;
  font-weight: 700;
  border: 2px solid #23242A;
  box-shadow: none;
  transition: border 0.2s, box-shadow 0.2s;
  gap: 10px;
`;
export const couponCardNameStyle = css`
  font-size: 16px;
  color: #E0DFE4;
`;
export const couponCardExpireStyle = css`
  font-size: 12px;
  color: #A0A0B0;
  margin-top: 2px;
`;
export const watermarkStyle = css`
  width: 100%;
  text-align: center;
  margin-bottom: 24px;
  font-size: 48px;
  font-weight: 800;
  color: #E0DFE4;
  opacity: 0.12;
  letter-spacing: 2px;
`; 