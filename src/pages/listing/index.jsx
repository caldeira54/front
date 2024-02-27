import React, { useEffect, useState } from "react";

import './listing.css';

import api from '../../services/api';

import isConnected from '../../utils/isConnected';

import Header from '../../components/header';
import Footer from '../../components/footer';
import Logo from '../../components/logo';
import Menu from '../../components/menu';
import CardListing from "../../components/cardListing";

function Listing() {
    const [identifications, setIdentifications] = useState([]);
    const [identificationsLoaded, setIdentificationsLoaded] = useState(false);

    async function loadIdentifications() {
        await api.get(`/identification/all/${isConnected}`)
            .then(response => {
                setIdentifications(response.data);
                setIdentificationsLoaded(true);
            });
    }

    useEffect(() => {
        if (!identificationsLoaded)
            loadIdentifications();
    }, [identificationsLoaded]);

    return (
        <>
            <Header />
            <div className="container-listing">
                <div className="menu-listing">
                    <Menu />
                </div>

                <Logo />

                <div className="content-listing">
                    {
                        identifications ? (
                            identifications.map(i => (
                                <CardListing identification={i} />
                            ))
                        ) : (
                            <p>Não há nenhum PPT cadastrado</p>
                        )
                    }
                </div>
            </div>
            <Footer />
        </>

    );
}

export default Listing;