import React from 'react';
import { ItemType } from './tabs.types';

const TabsItem: React.FC<ItemType & { activeKey: string; handleClick: (key: string) => void }> = ({
  label,
  option,
  activeKey,
  handleClick
}) => (
  <li className={`film-nav__item ${activeKey === option ? 'film-nav__item--active' : ''}`}>
    <div
      className="film-nav__link"
      key={option}
      onClick={() => handleClick(option)}
    >
      {label}
    </div>
  </li>
);
const ItemMemo = React.memo(TabsItem);

export default ItemMemo;
