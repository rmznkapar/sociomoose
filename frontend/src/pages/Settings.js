import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import UserNavbar from '../components/UserNavbar';
import ProfileHeader from '../components/ProfileHeader';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { authUpdatePassword, userUpdateBio } from './../features/userSlice';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { setUser } from '../utils/Common';
const Settings = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [currPass, setCurrPass] = useState('');
  const [bio, setBio] = useState(user.bio || '');
  const [newPass, setNewPass] = useState('');
  
  const handleUpdatePassword = () => {
    dispatch(authUpdatePassword({
      currPass: currPass, 
      newPass: newPass
    })).then((res) => {
      if (!res.payload.error) {
        alert('Şifre başarı ile değiştirildi')
      } else {
        if (res.payload.error === 'WRONG_PASS') {
          alert('Girdiğiniz şifre hatalı')
        } else {
          alert('Sunucu hatası')
        }
      }
    })
  }

  const handleUpdateBio = () => {
    console.log(user);
    dispatch(userUpdateBio({bio: bio})).then((res) => {
      if (!res.payload.error) {
        const newUser = {
          ...user,
          bio: bio
        };
        setUser(newUser);
        alert('Bio başarı ile değiştirildi');
        window.location.reload();
      } else {
        alert('Sunucu hatası')
      }
    })
  }

  return (
    <div>
      <div>
        <UserNavbar />
      </div>
      <div className="container mx-auto pt-8">
        <div className="flex">
          <div className="w-96 md:w-124">
            <Sidebar />
          </div>
          <div className="w-full px-8">
            <ProfileHeader user={user} />
            <div className="mt-8 p-6 rounded-2xl bg-white flex">
              <div className="w-1/2 px-4">
                <h2 className="font-semibold text-xl">Şifreni Değiştir</h2>
                <div className="py-6">
                  <Input 
                    htmlFor="currPass"
                    value={currPass}
                    onChange={(e) => setCurrPass(e.target.value)}
                    label="Şuanki Şifren: "
                  />
                  <Input 
                    htmlFor="newPass"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    label="Yeni Şifren: "
                  />
                </div>
                <div className="flex justify-end">
                  <div>
                    <Button 
                      label="Şifre Değiştir"
                      onClick={handleUpdatePassword}
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/2 px-4">
                <h2 className="font-semibold text-xl">Biografi Değiştir</h2>
                <div className="py-6">
                  <Input 
                    htmlFor="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    label="Biografi: "
                  />
                </div>
                <div className="flex justify-end">
                  <div>
                    <Button 
                      label="Biografi Değiştir"
                      onClick={handleUpdateBio}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
