import { useQuery } from '@tanstack/react-query';

interface User {
  id: string;
  name: string;
  email: string;
}

async function getUserInfo(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/users/${id}`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json() as Promise<User>;
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserInfo(id),
    staleTime: 1000 * 60 * 5, // 5분
  });
} 