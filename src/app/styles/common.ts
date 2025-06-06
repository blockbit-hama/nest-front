import { css } from '@emotion/react';

export const flexCenterStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const commonButtonStyle = css`
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
`;

export const commonCardStyle = css`
  background: #1B1C22;
  border-radius: 16px;
  padding: 18px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const commonModalStyle = css`
  background: #23242A;
  border-radius: 24px;
  padding: 32px;
  width: 90%;
  max-width: 420px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.3);
  color: #E0DFE4;
`; 