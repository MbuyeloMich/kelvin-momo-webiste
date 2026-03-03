import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Autoplay prevented:", err);
        // fallback: wait for user interaction
        const onUserInteract = async () => {
          try {
            await audio.play();
            setIsPlaying(true);
            window.removeEventListener("click", onUserInteract);
          } catch (e) {
            console.error("Failed to play even after user interaction:", e);
          }
        };
        window.addEventListener("click", onUserInteract);
      }
    };

    tryAutoplay();
  }, []);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}audio/sukakude.mp3`}
        loop
      />
      <button
        onClick={togglePlayback}
        className="fixed bottom-5 right-4 cursor-pointer active:scale-95 bg-gradient-to-r from-cyan-400 to-emerald-400 text-zinc-950 font-bold p-3 rounded-2xl shadow-xl shadow-cyan-500/20 z-50 hover:from-cyan-300 hover:to-emerald-300 transition"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
    </>
  );
}
