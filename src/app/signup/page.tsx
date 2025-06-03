"use client";
import { useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default function SignupPage() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setResult(null);
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const res = await fetch(`${baseUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        setResult("회원가입 성공! 이메일 인증을 진행하세요.");
        form.reset();
      } else {
        setResult("회원가입 실패");
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
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>회원가입</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label>
            이름
            <input name="name" required style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 8, border: "1px solid #ccc" }} />
          </label>
          <label>
            이메일
            <input name="email" type="email" required style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 8, border: "1px solid #ccc" }} />
          </label>
          <label>
            비밀번호
            <input name="password" type="password" required style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 8, border: "1px solid #ccc" }} />
          </label>
          <button type="submit" disabled={loading} style={{ marginTop: 12, padding: 10, borderRadius: 8, background: "#1976d2", color: "#fff", fontWeight: 600, border: 0 }}>
            {loading ? "가입 중..." : "회원가입"}
          </button>
        </form>
        {result && <div style={{ marginTop: 16, textAlign: "center" }}>{result}</div>}
      </div>
    </div>
  );
} 