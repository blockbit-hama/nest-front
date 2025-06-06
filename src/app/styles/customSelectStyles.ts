import { css } from '@emotion/react';

export const selectButtonStyle = (open: boolean, accentColor: string, height: number | string, fontSize: number, padding: string) => css`
  width: 100%;
  height: ${typeof height === 'number' ? `${height}px` : height};
  background: #23242A;
  color: inherit;
  border: ${open ? `2px solid ${accentColor}` : '2px solid #23242A'};
  border-radius: 14px;
  font-size: ${fontSize}px;
  font-weight: 700;
  padding: ${padding};
  padding-right: 48px;
  text-align: left;
  outline: none;
  box-shadow: ${open ? '0 4px 16px rgba(0,0,0,0.18)' : '0 2px 8px rgba(0,0,0,0.08)'};
  cursor: pointer;
  position: relative;
  transition: border 0.2s, box-shadow 0.2s;
  min-height: ${typeof height === 'number' ? `${height}px` : height};
`;

export const dropdownMenuStyle = (accentColor: string) => css`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 6px);
  background: #23242A;
  border-radius: 14px;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18);
  z-index: 1000;
  padding: 6px;
  max-height: 320px;
  overflow-y: auto;
  border: 2px solid ${accentColor};
`;

export const dropdownOptionStyle = (selected: boolean, accentColor: string, fontSize: number, height: number | string) => css`
  padding: 20px 32px;
  font-size: ${fontSize + 4}px;
  font-weight: 700;
  color: ${selected ? accentColor : '#E0DFE4'};
  background: ${selected ? '#1B1C22' : 'transparent'};
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 2px;
  outline: none;
  transition: background 0.15s, color 0.15s;
  height: ${typeof height === 'number' ? `${Number(height) + 8}px` : '64px'};
  display: flex;
  align-items: center;
`; 