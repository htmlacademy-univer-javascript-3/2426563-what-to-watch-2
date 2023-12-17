import React, { useCallback, useLayoutEffect, useState } from 'react';
import Page404 from '../page404';
import { useNavigate, useParams } from 'react-router-dom';
import RatingInput from '../../components/input/rating-stars';
import LOCALE from './add-rewiew.locale';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { addReview, fetchFilmAction } from '../../store/api-action';
import LoadingSreen from '../loading-sreen';
import Header from './header';
import { getFilm, getFilmDataLoadingStatus, getFilmErrorStatus } from '../../store/film/film.selectors';
import { resetFilm } from '../../store/film/film.slices';

const initFormValue = {
  rating: null,
  text: ''
};

type FormValueType = {
  rating: null | number;
  text: string;
};

const MAX_LEN_REVIEW = 400;
const MIN_LEN_REVIEW = 50;

const AddReview: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const film = useAppSelector(getFilm);
  const isFilmDataLoading = useAppSelector(getFilmDataLoadingStatus);
  const hasError = useAppSelector(getFilmErrorStatus);
  const [formValue, setFormValue] = useState<FormValueType>(initFormValue);
  const [isServerError, setIsServerError] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (params.id) {
      dispatch(fetchFilmAction({ filmId: params.id }));
    }
    return () => {
      dispatch(resetFilm());
    };
  }, [params.id, dispatch]);

  const handleClickRating = useCallback((event?: React.ChangeEvent<HTMLInputElement>) => {
    const rating = event?.target.value ? Number(event?.target.value) : null;
    setFormValue((prev) => ({ ...prev, rating }));
  }, []);

  const handleChangeText = (event?: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormValue((prev) => ({ ...prev, text: event?.target.value ?? '' }));
  };

  const handlePost = (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.preventDefault();
    if (
      film?.id === undefined
      || formValue.rating === null
      || formValue.text.length < MIN_LEN_REVIEW
      || formValue.text.length > MAX_LEN_REVIEW
    ) {
      return;
    }

    setIsServerError(false);


    dispatch(
      addReview({ filmId: film.id, rating: formValue.rating, comment: formValue.text })
    ).then((s) => {
      if (s.meta.requestStatus === 'fulfilled') {
        navigate(`/films/${film.id}`);
      } else {
        setIsServerError(true);
      }

    });


    setFormValue(initFormValue);
  };

  const isDisabled = formValue.rating === null || formValue.text.length < MIN_LEN_REVIEW || formValue.text.length > MAX_LEN_REVIEW;

  if (isFilmDataLoading) {
    return <LoadingSreen />;
  }

  if (hasError || film === null) {
    return <Page404 />;
  }

  return (
    <section className="film-card film-card--full" style={{ background: film.backgroundColor }}>
      <Header film={film} />

      <div className="add-review">
        <form action="#" className="add-review__form">
          <div className="rating">
            <RatingInput
              onChange={handleClickRating}
              selectedValue={formValue.rating}
            />
          </div>
          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              data-testid="review-text"
              placeholder="Review text"
              onChange={handleChangeText}
              value={formValue.text}
            />
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                onClick={handlePost}
                disabled={isDisabled}
              >
                {LOCALE.POST}
              </button>
            </div>
          </div>
        </form>
      </div>

      {isServerError ?
        <div style={{
          color: 'red',
          display: 'flex',
          justifyContent: 'center',
          marginTop: 5
        }}
        >
          <span>{LOCALE.SERVER_ERROR}</span>
        </div> :
        null}

    </section>
  );
};

export default AddReview;
