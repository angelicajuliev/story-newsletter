import './base.scss';
import { Outlet } from "react-router-dom";
import Sidebar from "@components/Sidebar/Sidebar";

const BasePage = () => {
  return (
    <div className='BasePage'>
      <Sidebar />

      <main>
        <h1>BasePage</h1>

        <Outlet />
      </main>
    </div>
  );
}

export default BasePage;
