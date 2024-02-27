import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../../components/logo';

import api from '../../services/api';

import './login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    await api.post('user/login', { email, password })
      .then(response => {
        localStorage.setItem('@ppt/idUser', response.data.userId);
        //navigate('/home');
        window.open('/home', '_self');
      })
      .catch(error => {
        setErro(true);
      });
  }

  return (
    <>
      <div className='containerLogin'>
        <Logo />

        <form className='content'>
          <div className='welcome'>
            <span>Bem-vindo</span>
          </div>

          <input type='email' placeholder='Digite seu email' className='inputEmail' name='email'
            autoComplete='off'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input type='password' placeholder='Digite sua senha' className='inputPassword' name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {erro &&
            <div className='erro'>
              <p>Usuário ou senha inválidos.</p>
            </div>
          }

          <button type='submit' id='button' onClick={(e) => handleLogin(e)}>Entrar</button>
        </form>
      </div>
    </>
  )
}
export default Login;