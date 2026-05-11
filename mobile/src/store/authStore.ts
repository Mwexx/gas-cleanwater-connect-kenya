import { create } from 'zustand';
type User = { id: string; role: string; phone: string };
type AuthState = { user: User | null; token: string | null; setUser: (u: User | null) => void; setToken: (t: string | null) => void };
export const useAuth = create<AuthState>((set) => ({
  user: null, token: null,
  setUser: (u) => set({ user: u }),
  setToken: (t) => { localStorage.setItem('token', t || ''); set({ token: t }); }
}));