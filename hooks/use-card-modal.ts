import { create } from 'zustand';

type CardModalStore = {
  id?: string;
  audioId?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  setAudioId: (audioId: string) => void;
};

export const useCardModal = create<CardModalStore>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, audioId: undefined, id: undefined }),
  setAudioId: (audioId: string) => set({ audioId }),
}));
