import { AudioLines } from 'lucide-react';

import { useRef } from 'react';

interface AudioPlayerProps {
  audioData: {
    url: string;
    title: string;
  };
}
export const AudioPlayer = ({ audioData }: AudioPlayerProps) => {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);

  return (
    <div className="flex items-center flex-col">
      <div className="flex my-4">
        <AudioLines className="mr-2" />
        <p className="font-semibold text-neutral-700 mb-2">
          {audioData?.title}
        </p>
      </div>
      <div>
        <audio
          ref={audioPlayerRef}
          id="audioPlayer"
          controls
          src={audioData?.url}
        ></audio>
      </div>
    </div>
  );
};
