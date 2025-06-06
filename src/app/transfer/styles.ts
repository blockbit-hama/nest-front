import { css } from '@emotion/react';
import { flexCenterStyle, commonButtonStyle, commonCardStyle, commonModalStyle } from '../styles/common';

export const loadingModalBgStyle = css`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(20,21,26,0.85);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const loadingModalBoxStyle = commonModalStyle;

export const modalBgStyle = loadingModalBgStyle;

export const modalBoxStyle = commonModalStyle;

export const sectionStyle = css`
  margin-bottom: 16px;
`;

export const cardStyle = commonCardStyle;

export const labelStyle = css`
  display: block;
  font-size: 15px;
  color: #A0A0B0;
  margin-bottom: 8px;
`;

export const recentCardStyle = css`
  background: #23242A;
  border-radius: 10px;
  padding: 10px 16px;
  color: #E0DFE4;
  font-size: 14px;
  font-family: monospace;
  cursor: pointer;
  border: 2px solid #23242A;
  transition: border 0.2s;
  min-width: 0;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  &:hover {
    border: 2px solid #F2A003;
  }
`;

export const modalCardStyle = css`
  background: #1B1C22;
  border-radius: 10px;
  padding: 12px 18px;
  color: #E0DFE4;
  font-size: 15px;
  font-family: monospace;
  cursor: pointer;
  border: 2px solid #23242A;
  margin-bottom: 10px;
  transition: border 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  &:hover {
    border: 2px solid #F2A003;
  }
`;

export const buttonGroupStyle = css`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`; 