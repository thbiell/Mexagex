import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const useConversationStore = create((set) => ({
  conversationId: null,
  setConversationId: (id) => set({ conversationId: id }),
}));

const useFrienIdStore = create((set) => ({
  friendId: null,
  setFriendId: (id) => set({ friendId: id }),
}));

const mmkv = new MMKV();

// Define the initial state for authentication
const initialState = {
  isAuthenticated: false,
};

const isAuthStore = create(
  persist(
    (set) => ({
      ...initialState,
      // Function to set the authentication state
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    }),
    {
      // Store key in MMKV
      name: 'isAuthStore',
      // MMKV instance
      adapter: mmkv,
    }
  )
);
export { useConversationStore, useFrienIdStore, isAuthStore};
