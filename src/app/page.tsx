"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [userId, setUserId] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div style={{ minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", background: "linear-gradient(135deg, #f0f4f8 0%, #fff 100%)" }}>
      {/* 탑바 */}
      <nav style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.8)", borderBottom: "1px solid #eee", boxShadow: "0 2px 8px 0 rgba(0,0,0,0.03)", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "32px 0" }}>
          <Link href="/" style={{ fontSize: 28, fontWeight: 800, letterSpacing: -1, color: "#1976d2", textDecoration: "none" }}>
            nest-wallet
          </Link>
          <div style={{ display: "flex", gap: 8 }}>
            <Link href="/login">
              <button style={{ borderRadius: 999, padding: "8px 20px", fontWeight: 600, background: "transparent", border: "1px solid #1976d2", color: "#1976d2", cursor: "pointer" }}>로그인</button>
            </Link>
            <Link href="/signup">
              <button style={{ borderRadius: 999, padding: "8px 20px", fontWeight: 600, background: "#1976d2", color: "#fff", border: 0, cursor: "pointer" }}>회원가입</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", padding: "64px 16px" }}>
          <div style={{ width: "100%", maxWidth: 600, borderRadius: 24, padding: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 40, boxShadow: "0 8px 32px 0 rgba(25, 118, 210, 0.08)", border: "2px solid #bbdefb", background: "#fff" }}>
            <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, color: "#1976d2", textAlign: "center", textShadow: "0 2px 8px #e3f2fd" }}>Welcome to nest-wallet 👛</div>
            <div style={{ fontSize: 18, color: "#616161", marginBottom: 16, textAlign: "center", lineHeight: 1.6, maxWidth: 480 }}>
              <span style={{ fontWeight: 600, color: "#1976d2" }}>nest-wallet</span>는 안전하고 간편한 디지털 자산 관리와 인증을 위한 오픈소스 지갑 서비스입니다.<br />
              회원가입, 이메일 인증, 로그인, 유저 정보 조회 등 다양한 기능을 제공합니다.
            </div>
            <form
              style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 400 }}
              onSubmit={e => {
                e.preventDefault();
                setSearch(userId);
              }}
            >
              <input
                placeholder="유저 ID로 검색"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                style={{ flex: 1, border: "1px solid #90caf9", borderRadius: 16, padding: "16px 16px", fontSize: 18, boxShadow: "0 2px 8px #e3f2fd", outline: "none" }}
                autoFocus
              />
              <button type="submit" style={{ width: "100%", borderRadius: 16, fontWeight: 600, fontSize: 18, padding: "16px 0", boxShadow: "0 2px 8px #e3f2fd", background: "#1976d2", color: "#fff", border: 0, cursor: "pointer" }}>검색</button>
            </form>
            {search && (
              <div style={{ width: "100%", marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ fontSize: 12, color: "#90a4ae", marginBottom: 4 }}>검색 결과</div>
                <Link href={`/user/${search}`} style={{ display: "block", padding: "12px 0", borderRadius: 16, background: "#e3f2fd", color: "#1976d2", fontWeight: 600, textAlign: "center", fontSize: 18, boxShadow: "0 2px 8px #e3f2fd", textDecoration: "none" }}>
                  {`/user/${search}`} 페이지로 이동
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
