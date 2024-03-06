import { AudioLines } from 'lucide-react';
import { useRef } from 'react';

export const Audio = () => {
  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const audioObjectUrl = URL.createObjectURL(file);
      if (audioPlayerRef.current) {
        audioPlayerRef.current.src = audioObjectUrl;
      }
    }
  };

  return (
    <div className="flex items-center flex-col sm:">
      <div className="flex my-4">
        <AudioLines className="mr-2" />
        <p className="font-semibold text-neutral-700 mb-2">Audio</p>
      </div>
      <div className="mb-2">
        <input
          type="file"
          accept="audio/*"
          onChange={onChange}
          className="border border-gray-800 rounded-xl"
        />
      </div>
      <div>
        <audio ref={audioPlayerRef} id="audioPlayer" controls></audio>
      </div>
    </div>
  );
};
