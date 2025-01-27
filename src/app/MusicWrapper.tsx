"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import {
  PiSpeakerSimpleHighDuotone,
  PiSpeakerSimpleSlashDuotone,
} from "react-icons/pi";

function MusicWrapper({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        const fadeOut = setInterval(() => {
          if (audioRef.current && audioRef.current.volume > 0.01) {
            audioRef.current.volume -= 0.01;
          } else {
            clearInterval(fadeOut);
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.volume = 0;
            }
          }
        }, 50);
      } else {
        audioRef.current.volume = 0;
        audioRef.current.play();
        const fadeIn = setInterval(() => {
          if (audioRef.current && audioRef.current.volume < 0.2) {
            audioRef.current.volume += 0.01;
          } else {
            clearInterval(fadeIn);
          }
        }, 50);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <button
        onClick={toggleAudio}
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          zIndex: 1000,
        }}
        className="opacity-50 hover:opacity-100 transition-opacity duration-300 bg-black rounded-full p-1"
      >
        {isPlaying ? (
          <PiSpeakerSimpleSlashDuotone />
        ) : (
          <PiSpeakerSimpleHighDuotone />
        )}
      </button>
      <audio ref={audioRef} src="/music/background.mp3" loop preload="auto" />
      {children}
    </div>
  );
}

export default dynamic(() => Promise.resolve(MusicWrapper), { ssr: false });
