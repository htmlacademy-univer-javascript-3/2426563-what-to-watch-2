import React from 'react';
import LOCALE from './film-card.locale';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import Buttons from './buttons';
import { FilmCardProps } from './film-card.types';

const FilmCard: React.FC<FilmCardProps> = ({film, myListCount }) => (
  <section className="film-card">
    <div className="film-card__bg">
      <img src={film.poster.src} alt={film.poster.alt} />
    </div>

    <h1 className="visually-hidden">{LOCALE.TITLE}</h1>

    <header className="page-header film-card__head">
      <Logo />
      <UserBlock/>
    </header>

    <div className="film-card__wrap">
      <div className="film-card__info">
        <div className="film-card__poster">
          <img src={film.poster.src} alt={film.poster.alt} width="218" height="327"/>
        </div>

        <div className="film-card__desc">
          <h2 className="film-card__title">{film.title}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{film.genre}</span>
            <span className="film-card__year">{film.year}</span>
          </p>

          <Buttons myListCount={myListCount}/>
        </div>
      </div>
    </div>
  </section>

);

export default FilmCard;
