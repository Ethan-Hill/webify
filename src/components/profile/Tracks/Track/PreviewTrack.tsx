import { NextPage } from "next";
import { useState, useRef, useEffect } from "react";

interface Props {
  track: SpotifyApi.TrackObjectFull;
}

const PreviewTrack: NextPage<Props> = (props) => {
  const { track } = props;

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const pauseAll = async () => {
    const audioPlayers = [...document.getElementsByTagName("audio")];

    audioPlayers.forEach((player) => {
      player.pause();
    });
  };

  const handlePlay = async () => {
    await pauseAll().then(() => {
      setIsPlaying(true);
      audioRef.current!.play();
    });
  };

  const handlePause = () => {
    setIsPlaying(false);
    audioRef.current!.pause();
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    const audio = audioRef.current!;

    audio.volume = 0.1;

    const updateProgress = () => {
      const duration = audio.duration;
      const currentTime = audio.currentTime;
      const progress = (currentTime / duration) * 100;

      setProgress(progress);
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  return (
    <div>
      <audio
        ref={audioRef}
        src={track.preview_url!}
        onEnded={handleEnded}
        onPause={handlePause}
      />
      <div className="relative h-16 w-16">
        <svg
          viewBox="0 0 100 100"
          className="absolute top-0 left-0 h-full w-full"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="rgba(0,0,0,0.3)"
            strokeWidth="5"
          />
          <circle
            className="circle"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            strokeWidth="5"
            pathLength="100"
            strokeDasharray={`${progress.toFixed(0)}, 100`}
          />
        </svg>
        {isPlaying ? (
          <button className="previewButton" onClick={handlePause}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M14 19V5h4v14h-4Zm-8 0V5h4v14H6Z" />
            </svg>
          </button>
        ) : (
          <button className="previewButton" onClick={handlePlay}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M8 19V5l11 7l-11 7Z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default PreviewTrack;
