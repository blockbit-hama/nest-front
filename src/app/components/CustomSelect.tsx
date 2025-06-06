import React, { useState, useRef, useEffect } from 'react';

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
        style={{
          width: '100%',
          height,
          background: '#23242A',
          color: selected ? '#E0DFE4' : '#A0A0B0',
          border: open ? `2px solid ${accentColor}` : '2px solid #23242A',
          borderRadius: 14,
          fontSize,
          fontWeight: 700,
          padding,
          paddingRight: 48,
          textAlign: 'left',
          outline: 'none',
          boxShadow: open ? '0 4px 16px rgba(0,0,0,0.18)' : '0 2px 8px rgba(0,0,0,0.08)',
          cursor: 'pointer',
          position: 'relative',
          transition: 'border 0.2s, box-shadow 0.2s',
          minHeight: height
        }}
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
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 'calc(100% + 6px)',
            background: '#23242A',
            borderRadius: 14,
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
            zIndex: 1000,
            padding: 6,
            maxHeight: 320,
            overflowY: 'auto',
            border: `2px solid ${accentColor}`
          }}
        >
          {options.map(opt => (
            <div
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              tabIndex={0}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              onKeyDown={e => { if (e.key === 'Enter') { onChange(opt.value); setOpen(false); }}}
              style={{
                padding: '14px 24px',
                fontSize,
                fontWeight: 700,
                color: opt.value === value ? accentColor : '#E0DFE4',
                background: opt.value === value ? '#1B1C22' : 'transparent',
                borderRadius: 10,
                cursor: 'pointer',
                marginBottom: 2,
                outline: 'none',
                transition: 'background 0.15s, color 0.15s',
                height: typeof height === 'number' ? height - 8 : undefined,
                display: 'flex',
                alignItems: 'center',
              }}
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