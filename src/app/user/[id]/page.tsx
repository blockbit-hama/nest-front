import { notFound } from "next/navigation";

async function getUserInfo(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/users/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function UserPage(props: { params: { id: string } }) {
  const { params } = props;
  // Next.js 14+에서는 params를 await 해야 함
  const awaitedParams = await params;
  const user = await getUserInfo(awaitedParams.id);
  if (!user) return notFound();

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 350, border: "1px solid #eee", borderRadius: 16, padding: 32, background: "#fff" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>유저 정보</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div><b>ID:</b> {user.id}</div>
          <div><b>이름:</b> {user.name}</div>
          <div><b>이메일:</b> {user.email}</div>
        </div>
      </div>
    </div>
  );
} 