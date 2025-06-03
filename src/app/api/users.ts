export async function signup({ name, email, password }: { name: string; email: string; password: string }) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res;
}

export async function login({ email, password }: { email: string; password: string }) {
  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res;
}

export async function verifyEmail(signupVerifyToken: string) {
  const res = await fetch(`/api/users/email-verify?signupVerifyToken=${encodeURIComponent(signupVerifyToken)}`, {
    method: "POST",
  });
  return res;
}

export async function getUserInfo(id: string) {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) return null;
  return res.json();
} 