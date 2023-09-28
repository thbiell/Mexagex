import {create} from 'zustand';

const useConversationStore = create((set) => ({
  conversationId: null,
  setConversationId: (id) => set({ conversationId: id }),
}));

export default useConversationStore;
