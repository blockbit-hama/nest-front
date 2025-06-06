import React, { useState, useRef, useEffect } from 'react';
import { selectButtonStyle, dropdownMenuStyle, dropdownOptionStyle } from '../styles/customSelectStyles';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  width?: number | string;
  height?: number | string;
  fontSize?: number;
  padding?: string;
  placeholder?: string;
  accentColor?: string;
  style?: React.CSSProperties;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  options,
  onChange,
  width = '100%',
  height = 56,
  fontSize = 20,
  padding = '18px 48px 18px 24px',
  placeholder = '선택',
  accentColor = '#F2A003',
  style
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const selected = options.find(opt => opt.value === value);

  return (
    <div ref={ref} style={{ position: 'relative', width, ...style }}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        css={selectButtonStyle(open, accentColor, height, fontSize, padding)}
        style={{ color: selected ? '#E0DFE4' : '#A0A0B0' }}
      >
        <span style={{
          display: 'inline-block',
          maxWidth: typeof width === 'number' ? width - 64 : 'calc(100% - 64px)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          verticalAlign: 'middle',
        }}>
          {selected ? selected.label : <span style={{ color: '#A0A0B0' }}>{placeholder}</span>}
        </span>
        <span style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke={accentColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      {open && (
        <div
          role="listbox"
          tabIndex={-1}
          css={dropdownMenuStyle(accentColor)}
        >
          {options.map(opt => (
            <div
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              tabIndex={0}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              onKeyDown={e => { if (e.key === 'Enter') { onChange(opt.value); setOpen(false); }}}
              css={dropdownOptionStyle(opt.value === value, accentColor, fontSize, height)}
            >
              <span style={{
                display: 'inline-block',
                maxWidth: typeof width === 'number' ? width - 48 : 'calc(100% - 48px)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>{opt.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 