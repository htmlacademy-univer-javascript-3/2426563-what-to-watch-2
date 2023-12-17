import React, { useLayoutEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Page404 from '../page404';
import LOCALE from './player.locale';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getFilm, getFilmDataLoadingStatus, getFilmErrorStatus } from '../../store/film/film.selectors';
import { fetchFilmAction, fetchSimilarFilm, fetchReviewsFilm } from '../../store/api-action';
import { resetFilm } from '../../store/film/film.slices';
import LoadingSreen from '../loading-sreen';
import useVideoPlayer from '../../hooks/use-video-player';
import Progress from './progress';
import PlayerButtons from './player-buttons';

const Player: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const params = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector(getFilm);
  const hasError = useAppSelector(getFilmErrorStatus);
  const isFilmDataLoading = useAppSelector(getFilmDataLoadingStatus);
  const {
    isPlaying,
    currentTime,
    duration,
    isLoadingFilm,
    togglePlay,
    handleTimeUpdate,
    handleSlider,
    handleFullSrceen,
    handleLoadedMetadata
  } = useVideoPlayer(videoRef, sliderRef);

  useLayoutEffect(() => {
    if (params.id) {
      dispatch(fetchFilmAction({ filmId: params.id }));
      dispatch(fetchSimilarFilm({ filmId: params.id }));
      dispatch(fetchReviewsFilm({ filmId: params.id }));
    }
    return () => {
      dispatch(resetFilm());
    };
  }, [params.id, dispatch]);

  if (isFilmDataLoading) {
    return <LoadingSreen />;
  }

  if (hasError || film === null) {
    return <Page404 />;
  }

  const progress = (currentTime / duration) * 100;
  const runTime = film.runTime * (1 - (currentTime / duration));

  return (
    <div className="player">
      {isLoadingFilm ? <LoadingSreen /> : null}
      <video
        className="player__video"
        poster={film.backgroundImage}
        ref={videoRef}
        autoPlay={false}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      >
        <source src={film.videoLink} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Link type='button' className="player__exit" to={`/films/${film.id}`}>
        {LOCALE.EXIT}
      </Link>

      <div className="player__controls">
        <Progress
          handleSlider={handleSlider}
          progress={progress}
          runTime={runTime}
          sliderRef={sliderRef}
        />

        <PlayerButtons
          togglePlay={togglePlay}
          handleFullSrceen={handleFullSrceen}
          isPlaying={isPlaying}
          name={film.name}
        />
      </div>
    </div>
  );
};

export default Player;
