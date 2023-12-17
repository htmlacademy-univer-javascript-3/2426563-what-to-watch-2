import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import SmallVideoPlayer from '../video-player/small-video-player';
import { IFilmData } from '../../data/abstractions/IFilmData';
import useSmallVideoPlayer from '../../hooks/use-small-video-player';

const SmallFilmCard: React.FC<IFilmData> = (props) => {
  const videoRef = useRef(null);
  const { handleMouseEnter, handleMouseLeave, isHovered } = useSmallVideoPlayer(videoRef);
  return (
    <Link
      className="small-film-card catalog__films-card small-film-card__link"
      to={`/films/${props.id}`}
      data-testid="small-film-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SmallVideoPlayer {...props} isHovered={isHovered} videoRef={videoRef} />
      <h3 className="small-film-card__title">
        <p className="small-film-card__link">
          {props.name}
        </p>
      </h3>
    </Link>
  );
};

export default SmallFilmCard;
