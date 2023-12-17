import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TIMEOUT_SEC } from '../../data/constants/timeout';
import SmallFilmCard from './small-film-card';

const mockFilm = {
  id: '1',
  name: 'Snatch',
  previewImage: 'https://10.react.pages.academy/static/film/poster/Snatch.jpg',
  previewVideoLink: 'https://10.react.pages.academy/static/film/video/matrix.mp4',
  genre: 'Comedy'
};

describe('SmallVideoPlayer Component', () => {
  it('should render without errors', () => {
    render(
      <MemoryRouter>
        <SmallFilmCard {...mockFilm} />
      </MemoryRouter>
    );

    const containerElement = screen.getByRole('img', { name: 'Snatch' });

    expect(containerElement).toBeInTheDocument();
  });

  it('should render video on mouse enter', () => {
    render(
      <MemoryRouter>
        <SmallFilmCard {...mockFilm} />
      </MemoryRouter>);
    const containerElement = screen.getByRole('img', { name: 'Snatch' });

    fireEvent.mouseEnter(containerElement);

    setTimeout(() => {
      const videoElement = screen.getByRole('video', { name: 'Snatch' });
      expect(videoElement).toBeInTheDocument();
    }, TIMEOUT_SEC);
  });
});
