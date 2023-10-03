import { SmallFilmCardProps } from '../small-film-card/small-film-card.types';

export type CatalogProps = {
	isNeededGenres?: boolean;
	cardList: SmallFilmCardProps[];
};
