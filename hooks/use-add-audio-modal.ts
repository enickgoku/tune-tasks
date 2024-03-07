import { create } from 'zustand';

interface UploadAudioStore {
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useAddAudioModal = create<UploadAudioStore>((set) => ({
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false }),
}));
