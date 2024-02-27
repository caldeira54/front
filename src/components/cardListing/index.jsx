import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './cardListing.css';

import api from '../../services/api';

export default function ({ identification }) {
    const [id, setId] = useState(identification.id);
    const [idCourse, setIdCourse] = useState(identification.idCourse);
    const [course, setCourse] = useState();
    const [year, setYear] = useState(identification.year);
    const [team, setTeam] = useState(identification.team);
    const [discipline, setDiscipline] = useState(identification.discipline);
    const [disciplineLoaded, setDisciplineLoaded] = useState(false);

    const showDiscipline = () => {
        api.get(`/course/${idCourse}`)
            .then(response => {
                setCourse(response.data.name);
                setDisciplineLoaded(true);
            })
    }

    useEffect(() => {
        if(!disciplineLoaded)
            showDiscipline();
    }, [disciplineLoaded])

    return (
        <div className='container-card-listing'>
            <div className='content-card-listing'>
                <span>PPT {year}-{discipline}-{team}</span>

                <div className='button-card-listing'>
                    <Link to={`/pdf/${id}/${idCourse}`}>
                        <button className='button-view'>Visualizar</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}