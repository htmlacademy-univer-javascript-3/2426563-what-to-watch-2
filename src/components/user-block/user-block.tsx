import React from 'react';
import LOCALE from './user-block.locale';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../data/enums/app-route';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { logoutAction } from '../../store/api-action';
import { getAuthCheckedStatus, getUserAvatarUrl, getUserName } from '../../store/user/user.selectors';
import { resetFavoriteFilms } from '../../store/favorite/favorite.slices';

const UserBlock: React.FC = () => {
  const isAuth = useAppSelector(getAuthCheckedStatus);
  const avatarUrl = useAppSelector(getUserAvatarUrl);
  const userName = useAppSelector(getUserName);
  const dispatch = useAppDispatch();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logoutAction());
    dispatch(resetFavoriteFilms());
  };

  return isAuth ?
    <ul className="user-block">
      <li className="user-block__item">
        <Link to={`/${AppRoute.MyList}`}>
          <div className="user-block__avatar">
            <img
              src={avatarUrl ?? 'img/avatar.jpg'}
              alt={userName ?? 'User avatar'}
              width="63"
              height="63"
            />
          </div>
        </Link>
      </li>
      <li className="user-block__item">
        <div
          className="user-block__link"
          onClick={handleClick}
        >
          {LOCALE.OUT}
        </div>
      </li>
    </ul>
    :
    <ul className="user-block">
      <li className="user-block__item">
        <Link
          to='/login'
          className="user-block__link"
        >
          {LOCALE.IN}
        </Link>
      </li>
    </ul>;
};

export default UserBlock;
