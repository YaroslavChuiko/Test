import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import s from './Layout.module.css';

const Layout = ({ tabs }) => {
  return (
    <div className={s.container}>
      <nav>
        {tabs.map((tab) => {
          return (
            <Link className={s.tab} key={tab.id} to={`${tab.id}`}>
              {tab.title}
            </Link>
          );
        })}
      </nav>

      <div className={s.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
