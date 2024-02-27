import React from "react";
import { useNavigate } from "react-router-dom";

import "./menu.css";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import menu from '../../assets/img/menu.png';

function MenuComponent() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRegister = () => {
        navigate('/home');
    }

    const handleListing = () => {
        navigate('/listing');
    }

    const handleHolidays = () => {
        navigate('/holidays');
    }

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    }

    return (
        <div>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <img src={menu} />
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleRegister}>Cadastro</MenuItem>
                <MenuItem onClick={handleListing}>PPTs</MenuItem>
                <MenuItem onClick={handleHolidays}>Feriados</MenuItem>
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
        </div>
    );
}

export default MenuComponent;