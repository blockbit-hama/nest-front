'use client';

import { useUser } from '@/hooks/useUser';
import { recentlyViewedUsersAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { notFound } from 'next/navigation';

export default function UserPage({ params }: { params: { id: string } }) {
  const { data: user, isLoading, error } = useUser(params.id);
  const [recentlyViewedUsers, setRecentlyViewedUsers] = useAtom(recentlyViewedUsersAtom);

  useEffect(() => {
    if (user) {
      setRecentlyViewedUsers(prev => {
        const filtered = prev.filter(id => id !== user.id);
        return [user.id, ...filtered].slice(0, 5); // 최근 5개만 유지
      });
    }
  }, [user, setRecentlyViewedUsers]);

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div>로딩 중...</div>
      </div>
    );
  }

  if (error || !user) return notFound();

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 350, border: "1px solid #eee", borderRadius: 16, padding: 32, background: "#fff" }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>유저 정보</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div><b>ID:</b> {user.id}</div>
          <div><b>이름:</b> {user.name}</div>
          <div><b>이메일:</b> {user.email}</div>
        </div>
        {recentlyViewedUsers.length > 1 && (
          <div style={{ marginTop: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>최근 본 사용자</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {recentlyViewedUsers
                .filter(id => id !== user.id)
                .map(id => (
                  <a key={id} href={`/user/${id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
                    사용자 {id}
                  </a>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 