import { useState } from 'react';

const useVideoPlayer = (videoRef: React.MutableRefObject<HTMLVideoElement | null>, sliderRef: React.MutableRefObject<HTMLDivElement | null>) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setFullScreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoadingFilm, setIsLoadingFilm] = useState(true);

  const togglePlay = () => {
    if (videoRef.current === null) {
      return;
    }
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current?.duration ?? 0);
    setIsLoadingFilm(false);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current?.currentTime ?? 0);
  };

  const handleFullSrceen = () => {
    if (videoRef.current === null) {
      return;
    }

    try {
      if (isFullScreen) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
      setFullScreen(!isFullScreen);
    } catch (e) {
      throw new Error('Error toggling fullscreen');
    }

  };

  const handleSlider = (clientX: number) => {
    if (videoRef.current === null || sliderRef.current === null) {
      return;
    }
    const newProgress = clientX / sliderRef.current.clientWidth;
    setProgress(newProgress * 100);
    videoRef.current.currentTime = videoRef.current.duration * newProgress;
  };

  return {
    isPlaying,
    progress,
    isLoadingFilm,
    duration,
    currentTime,
    togglePlay,
    handleTimeUpdate,
    handleSlider,
    handleFullSrceen,
    handleLoadedMetadata
  };
};

export default useVideoPlayer;
