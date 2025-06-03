"use client";
import { useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function LoginPage() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setResult(null);
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const res = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        setResult("로그인 성공!");
        form.reset();
      } else {
        setResult("로그인 실패");
      }
    } catch {
      setResult("오류 발생");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 350, border: "1px solid #eee", borderRadius: 16, padding: 32, background: "#fff" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>로그인</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label>
            이메일
            <input name="email" type="email" required style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 8, border: "1px solid #ccc" }} />
          </label>
          <label>
            비밀번호
            <input name="password" type="password" required style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 8, border: "1px solid #ccc" }} />
          </label>
          <button type="submit" disabled={loading} style={{ marginTop: 12, padding: 10, borderRadius: 8, background: "#1976d2", color: "#fff", fontWeight: 600, border: 0 }}>
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
        {result && <div style={{ marginTop: 16, textAlign: "center" }}>{result}</div>}
      </div>
    </div>
  );
} 