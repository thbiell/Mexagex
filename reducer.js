import {create} from 'zustand';

const useAuthStore = create((set) => ({
  uid: null, 
  setUid: (newUid) => set({ uid: newUid }),
}));

export default useAuthStore;
