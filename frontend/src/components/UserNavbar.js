import React from 'react';
import { useDispatch } from 'react-redux';
import { CgAddR } from 'react-icons/cg';
import BrandLogo from './common/BrandLogo'

import { showToggle } from '../features/modalSlice';
import UserPP from './common/UserPP';
import { APP_ROUTE } from '../constants/Routes';


const UserNavbar = () => {
  
  const dispatch = useDispatch();

  const handleCreateClick = () => {
    dispatch(showToggle());
  }
  
  return (
    <div className="w-100 bg-navbar border-b">
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          <div>
            <BrandLogo />
          </div>
          <div className="flex items-center">
            <div className="ml-3">
              <div>
                <div 
                  className="py-2 md:py-2.5 px-4 flex items-center font-medium text-white bg-primary rounded-xl cursor-pointer"
                  onClick={handleCreateClick}
                >
                  <div className="text-lg">
                    <CgAddR />
                  </div>
                  <p className="ml-2">
                    Oluştur
                  </p>
                </div>
              </div>
            </div>
            <div className="ml-3">
              <div>
                <a href={APP_ROUTE.MY_PROFILE}>
                  <UserPP /> 
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserNavbar
