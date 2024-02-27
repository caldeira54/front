import React from "react";
import { useNavigate } from "react-router-dom";

import './footer.css';

export default function Footer() {
    const navigate = useNavigate();

    const handleDevelopers = () => {
        navigate('/developers');
    }
    return (
        <footer>
            <span className='description'>sysPPT © 2023 <button onClick={handleDevelopers}>Desenvolvedores</button></span>
            <span className='description'>Instituto Federal de Minas Gerais - Campus São João Evangelista</span>
        </footer>
    )
}