import React, { useState, useEffect } from 'react';

import Card from '../card';

import './weeks.css';

import api from '../../services/api';

import idIdentification from '../../utils/idIdentification';

export default function Weeks() {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [weeks, setWeeks] = useState([]);
    const [weeksLoaded, setWeeksLoaded] = useState(false);

    const handleDates = async () => {
        if (!startDate)
            return alert('Você deve informar a data inicial do semestre!');
        else if (!endDate)
            return alert('Você deve informar a data final do semestre!');

        await api.post('/week/autoCreate', {
            idIdentification: `${idIdentification}`,
            startDate,
            endDate
        });
        loadWeeks();
    }

    async function loadWeeks() {
        await api.get(`/week/all/${idIdentification}`)
            .then(response => {
                setWeeks(response.data);
                setWeeksLoaded(true);
            });
    }

    useEffect(() => {
        if (!weeksLoaded)
            loadWeeks();
    }, [weeksLoaded]);

    return (
        <>
            <div className='container-weeks'>
                <div className='container-dates'>
                    <div className='dates'>
                        <span>Data inicial:</span>
                        <input
                            type='date'
                            onChange={e => setStartDate(e.target.value)}
                            value={startDate}
                        />
                    </div>

                    <div className='dates'>
                        <span>Data final:</span>
                        <input
                            type='date'
                            onChange={e => setEndDate(e.target.value)}
                            value={endDate}
                        />
                    </div>
                </div>

                <button className='button-generate' onClick={handleDates}>Gerar</button>

                {
                    weeks ? (
                        weeks.map(w => (
                            <Card week={w} />
                        ))
                    ) : loadWeeks()
                }
            </div>
        </>
    )
}