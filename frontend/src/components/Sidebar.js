import React from 'react'
import { NavLink } from 'react-router-dom'
import { APP_ROUTE } from '../constants/Routes'
import { userLogout } from './../features/userSlice';
import { useDispatch } from 'react-redux';

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex flex-col bg-navbar rounded-xl shadow-sm">
        <NavLink 
          className="px-4 md:px-8 py-4 font-semibold text-lg border-b border-gray-200 hover:bg-whitehover rounded-t-xl"
          to={APP_ROUTE.FEED} 
          activeClassName="text-primary hover:text-primary"
        >
          İçerikler
        </NavLink>
        <NavLink 
          className="px-4 md:px-8 py-4 font-semibold text-lg border-b border-gray-200 hover:bg-whitehover"
          to={APP_ROUTE.SPEC_FEED} 
          activeClassName="text-primary hover:text-primary"
        >
          Takip İçerikleri
        </NavLink>
        <NavLink 
          className="px-4 md:px-8 py-4 font-semibold text-lg border-b border-gray-200 hover:bg-whitehover"
          to={APP_ROUTE.MY_PROFILE} 
          activeClassName="text-primary hover:text-primary"
        >
          Profil
        </NavLink>
        <NavLink 
          className="px-4 md:px-8 py-4 font-semibold text-lg border-b border-gray-200 hover:bg-whitehover"
          to={APP_ROUTE.SETTINGS} 
          activeClassName="text-primary hover:text-primary"
        >
          Ayarlar
        </NavLink>
        <div
          onClick={() => dispatch(userLogout())}
          href="#logout"
          className="px-4 md:px-8 py-4 font-semibold text-lg hover:bg-whitehover rounded-b-xl cursor-pointer"
        >
          Çıkış Yap
        </div>
      </div>
    </div>
  )
}

export default Sidebar
