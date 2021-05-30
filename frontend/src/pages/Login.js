import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userLogin, selectError, selectAuth } from '../features/userSlice';
import Button from '../components/common/Button';
import { APP_ROUTE } from '../constants/Routes';
import { AUTH_WARNING } from '../constants/Warnings';
import Input from './../components/common/Input';
import Navbar from './../components/Navbar';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const auth = useSelector(selectAuth);
  const error = useSelector(selectError);

  if (auth) {
    return <Redirect to={APP_ROUTE.FEED} />
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      userLogin({
        username: username,
        password: password,
      }) 
    )
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
                placeholder="Kullanıcı Adı veya Email"
                label="Kullanıcı Adınız veya emailiniz: " 
                onChange={(e) => setUsername(e.target.value)}
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
            <div className="mb-4">
              <Button 
                label="Giriş Yap"
              />
            </div>
            <div className="mb-8 text-center">
              <p>{AUTH_WARNING[error]}</p>
            </div>
            <div>
              <p className="font-semibold text-center">
                Hesabın yok mu hemen 
                <a href={APP_ROUTE.REGISTER} className="ml-2 text-primary">kayıt ol</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;
