"use client";
import { css } from "@emotion/react";
import { useRouter, usePathname } from "next/navigation";

const tabList = [
  { key: "wallet", label: "지갑", path: "/", icon: (
    <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="8" width="22" height="12" rx="3" stroke="currentColor" strokeWidth="2"/>
      <rect x="18" y="13" width="4" height="2" rx="1" fill="currentColor"/>
    </svg>
  ) },
  { key: "voucher", label: "바우처", path: "/voucher-purchase", icon: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20L16 26L22 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 12L16 6L10 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) },
  { key: "coupon-swap", label: "쿠폰스왑", path: "/coupon-swap", icon: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 16h8M16 12v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ) },
  { key: "settings", label: "설정", path: "/settings", icon: (
    <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M14 10V14L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ) },
];

export function TabBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav css={css`
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
    `}>
      {tabList.map(tab => {
        const isActive = pathname === tab.path;
        return (
          <button
            key={tab.key}
            onClick={() => router.push(tab.path)}
            css={css`
              background: none; border: none;
              color: ${isActive ? "#F2A003" : "#888A92"};
              display: flex; flex-direction: column; align-items: center; flex: 1; cursor: pointer;
              font-weight: 700;
              font-size: 13px;
              gap: 2px;
            `}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
} 