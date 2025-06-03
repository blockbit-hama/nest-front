"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [userId, setUserId] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ background: "linear-gradient(135deg, #f0f4f8 0%, #fff 100%)" }}>
      {/* 탑바 */}
      <nav style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.8)", borderBottom: "1px solid #eee", boxShadow: "0 2px 8px 0 rgba(0,0,0,0.03)" }} className="sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-8 py-4">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-blue-700 hover:opacity-80 transition-opacity">
            nest-wallet
          </Link>
          <div className="flex gap-2">
            <Link href="/login">
              <button className="rounded-full px-5 py-2 font-semibold bg-transparent border border-blue-700 text-blue-700 hover:bg-blue-50 transition">로그인</button>
            </Link>
            <Link href="/signup">
              <button className="rounded-full px-5 py-2 font-semibold bg-blue-700 text-white hover:bg-blue-800 transition">회원가입</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full h-full py-16 px-4">
          <div className="w-full max-w-2xl rounded-3xl p-12 sm:p-16 flex flex-col items-center gap-10 shadow-2xl border-2 border-blue-100 bg-white/95">
            <div className="text-4xl sm:text-5xl font-extrabold mb-2 text-blue-700 text-center drop-shadow-sm">Welcome to nest-wallet 👛</div>
            <div className="text-base sm:text-lg text-gray-500 mb-4 text-center leading-relaxed max-w-xl">
              <span className="font-semibold text-blue-700">nest-wallet</span>는 안전하고 간편한 디지털 자산 관리와 인증을 위한 오픈소스 지갑 서비스입니다.<br />
              회원가입, 이메일 인증, 로그인, 유저 정보 조회 등 다양한 기능을 제공합니다.
            </div>
            <form
              className="flex flex-col sm:flex-row gap-3 w-full max-w-lg"
              onSubmit={e => {
                e.preventDefault();
                setSearch(userId);
              }}
            >
              <input
                placeholder="유저 ID로 검색"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                className="flex-1 border border-blue-200 rounded-xl px-4 py-4 text-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                autoFocus
              />
              <button type="submit" className="w-full sm:w-auto rounded-xl font-semibold text-lg px-8 py-4 shadow-md bg-blue-700 text-white hover:bg-blue-800 transition">검색</button>
            </form>
            {search && (
              <div className="w-full mt-2 animate-fade-in flex flex-col items-center">
                <div className="text-xs text-gray-400 mb-1">검색 결과</div>
                <Link href={`/user/${search}`} className="block px-6 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-center transition-colors text-lg shadow-sm">
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
