import './base.scss';
import { Outlet } from "react-router-dom";
import Header from '@components/Header/Header';

const BasePage = () => {
  return (
    <div className='BasePage'>
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default BasePage;
