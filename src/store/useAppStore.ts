import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  isContactModalOpen: boolean;
  setContactModalOpen: (open: boolean) => void;
  isQuickContactDrawerOpen: boolean;
  setQuickContactDrawerOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isContactModalOpen: false,
      setContactModalOpen: (open) => set({ isContactModalOpen: open }),
      isQuickContactDrawerOpen: false,
      setQuickContactDrawerOpen: (open) => set({ isQuickContactDrawerOpen: open }),
    }),
    {
      name: 'eon8-app-storage',
    }
  )
);
