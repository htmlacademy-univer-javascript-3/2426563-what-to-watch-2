import React from 'react';
import { IFilmData } from '../../data/abstractions/IFilmData';

const SmallVideoPlayer: React.FC<IFilmData & {
  isHovered: boolean;
  videoRef: React.MutableRefObject<null>;
  isMuted?: boolean;
}> = ({ name, previewImage, previewVideoLink, isHovered, videoRef, isMuted = true }) => (
  <div className="small-film-card__image" >
    {isHovered ? (
      <video
        ref={videoRef}
        poster={previewImage}
        muted={isMuted}
        width="280"
        height="175"
        controls={false}
      >
        <source src={previewVideoLink} type="video/mp4" />
      </video>
    ) : (
      <img
        src={previewImage}
        alt={name}
        width="280"
        height="175"
      />
    )}
  </div>
);

export default SmallVideoPlayer;
