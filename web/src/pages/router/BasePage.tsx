import './base.scss';
import { Outlet } from "react-router-dom";
import HeaderC from '@components/Header/HeaderC';

const BasePage = () => {
  return (
    <div className='BasePage'>
      <HeaderC />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default BasePage;
