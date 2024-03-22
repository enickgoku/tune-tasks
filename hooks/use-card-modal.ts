import { create } from 'zustand';

type CardSidebarStore = {
  id?: string;
  audioId?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  setAudioId: (audioId: string) => void;
};

export const useCardModal = create<CardSidebarStore>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false }),
  setAudioId: (audioId: string) => set({ audioId }),
}));
