import React, { useState, useEffect } from 'react';

import Header from '../../components/header';
import Footer from '../../components/footer';
import Logo from '../../components/logo';
import Menu from '../../components/menu';
import CardHolidays from '../../components/cardHolidays';

import api from '../../services/api';

import './holidays.css';

function Holidays() {
    const [holidays, setHolidays] = useState([]);
    const [holidaysLoaded, setHolidaysLoaded] = useState(false);
    const [name, setName] = useState();
    const [date, setDate] = useState();

    const handleSave = async () => {
        if (!name)
            return alert('Você deve informar o nome do feriado!');
        else if (!date)
            return alert('Você deve informar a data do feriado!');

        await api.post('/holiday', {
            name,
            date
        })
            .then(response => {
                alert('Feriado cadastrado com sucesso!');
                location.reload();
            })
            .catch(error => {
                alert('Já existe um feriado nessa data!');
            });
    }

    const loadHolidays = async () => {
        await api.get('holiday/all')
            .then(response => {
                setHolidays(response.data);
                setHolidaysLoaded(true);
            });
    }

    useEffect(() => {
        if (!holidaysLoaded)
            loadHolidays();
    }, [holidaysLoaded]);

    return (
        <>
            <Header />
            <div className='container-holidays'>
                <div className='menu-holidays'>
                    <Menu />
                </div>

                <Logo />

                <div className="content-holidays">
                    <h3>Cadastrar Feriados Municipais</h3>

                    <div className='register'>
                        <div className='data'>
                            <span>Nome</span>
                            <input
                                type="text"
                                onChange={e => setName(e.target.value)}
                                value={name}
                            />
                        </div>

                        <div className='data'>
                            <span>Data</span>
                            <input
                                type="date"
                                onChange={e => setDate(e.target.value)}
                                value={date}
                            />
                        </div>

                        <button className='button-save-holiday' onClick={handleSave}>Salvar</button>
                    </div>

                    <h3>Feriados Listados</h3>

                    {
                        holidays.map(h => (
                            <CardHolidays holiday={h} />
                        ))
                    }
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Holidays;