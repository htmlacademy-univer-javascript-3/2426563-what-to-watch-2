import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { filmList } from '../../mock/films';
import FilmList from './film-list';

describe('Film List Component', () => {
  it('should render without errors with film list', () => {
    render(
      <MemoryRouter>
        <FilmList filmList={filmList} />
      </MemoryRouter>
    );

    const filmsList = screen.queryAllByTestId('small-film-card');

    expect(filmsList).toHaveLength(filmList.length);
  });

  it('should render without errors with empty film list', () => {
    render(
      <MemoryRouter>
        <FilmList filmList={[]} />
      </MemoryRouter>
    );

    const filmsList = screen.queryAllByTestId('small-film-card');

    expect(filmsList).toHaveLength(0);
  });
});
