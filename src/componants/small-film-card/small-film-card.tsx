import React from 'react';
import { IFilm } from '../../data/abstractions';
import { Link } from 'react-router-dom';

const SmallFilmCard: React.FC<IFilm> = ({ id, title, thumbnailUrl }) => (
  <article className="small-film-card catalog__films-card">
    <div className="small-film-card__image">
      <img
        src={thumbnailUrl}
        alt={title}
        width="280"
        height="175"
      />
    </div>
    <h3 className="small-film-card__title">
      <Link className="small-film-card__link" to={`/films/${id}`}>
        {title}
      </Link>
    </h3>
  </article>
);

export default SmallFilmCard;
