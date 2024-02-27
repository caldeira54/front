import React from "react";
import { useNavigate } from "react-router-dom";

import './developers.css';

import Header from '../../components/header';
import Footer from '../../components/footer';

function Developers() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/home');
  }
  return (
    <>
      <Header />
      <button className='button-back-home' onClick={handleHome}>Voltar</button>
      <main className='container-developers'>

      </main>
      <Footer />
    </>
  )
}
export default Developers;