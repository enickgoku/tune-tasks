import { createContext, useContext, useState } from 'react';

const defaultValue = {
  audioId: '',
  setAudioId: (audioId: string) => {},
};
const AudioContext = createContext(defaultValue);

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [audioId, setAudioId] = useState('');

  return (
    <AudioContext.Provider value={{ audioId, setAudioId }}>
      {children}
    </AudioContext.Provider>
  );
};
