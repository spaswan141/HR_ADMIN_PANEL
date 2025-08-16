// store/authStore.js
import { create } from 'zustand';
import Cookies from 'js-cookie';

const useAuthStore = create((set) => ({
  isAuthenticated: !!Cookies.get("accessToken"),
  user: null,
  token: Cookies.get("accessToken") || null,

  login: (token, user) => {
    Cookies.set("accessToken", token, {
      expires: 0.0833, // 2 hours
      secure: import.meta.env.MODE === "production",
      sameSite: "Strict",
    });
    set({ isAuthenticated: true, token, user });
  },

  logout: () => {
    Cookies.remove("accessToken");
    set({ isAuthenticated: false, token: null, user: null });
  },
}));

export default useAuthStore;
