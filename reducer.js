import {create} from 'zustand';

const useConversationStore = create((set) => ({
  conversationId: null,
  setConversationId: (id) => set({ conversationId: id }),
}));
const useFrienIdStore = create((set) => ({
  friendId: null,
  setFriendId: (id) => set({ friendId: id }),
}));

export default useConversationStore;
