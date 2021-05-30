import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userRegister, selectError, selectAuth, setError } from '../features/userSlice';
import Button from '../components/common/Button';
import { APP_ROUTE } from '../constants/Routes';
import { AUTH_WARNING } from '../constants/Warnings';
import Input from './../components/common/Input';
import Navbar from './../components/Navbar';

const Register = () => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

  const dispatch = useDispatch();

  const auth = useSelector(selectAuth);
  const error = useSelector(selectError);
  
  if (auth) {
    return <Redirect to={APP_ROUTE.FEED} />
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === repassword) {      
      dispatch(
        userRegister({
          email: email,
          username: username,
          password: password,
        })
      );
    } else {
      dispatch(setError('UNMATCHED_PASSWORD'))
    }
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="container mx-auto flex justify-center">
        <div className="pt-10 md:pt-24 px-8 md:w-96">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input 
                htmlFor="usernameInput" 
                type="text" 
                placeholder="Kullanıcı Adı"
                label="Kullanıcı Adınız: " 
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <Input 
                htmlFor="emailInput" 
                type="email" 
                placeholder="Email"
                label="Email adresiniz: " 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <Input 
                htmlFor="passwordInput" 
                type="password" 
                placeholder="Şifre"
                label="Şifreniz: " 
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <Input 
                htmlFor="repasswordInput" 
                type="password" 
                placeholder="Şifre"
                label="Şifrenizi Yeniden Giriniz: " 
                onChange={(e) => setRepassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Button 
                label="Kayıt Ol"
              />
            </div>
            <div className="mb-8 text-center">
              <p>{AUTH_WARNING[error]}</p>
            </div>
            <div>
              <p className="font-semibold text-center">
                Hesabın var mı hemen 
                <a href={APP_ROUTE.LOGIN} className="ml-2 text-primary">giriş yap</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;
