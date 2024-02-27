import React from "react";

import './logo.css';

import logo from '../../assets/img/logo.png';

function Logo() {
    return (
        <div className='container-logo'>
            <img src={logo} alt='Logo' />

            <span>Sistema de Auxílio ao Professor</span>
        </div>
    );
}

export default Logo;