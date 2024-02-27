import React, { useState, useEffect } from "react";
import { format } from "date-fns"

import Logo from '../../components/logo';

import './week.css';

import api from '../../services/api';

function Week({ match }) {
    const [weekOrder, setWeekOrder] = useState();
    const [programContent, setProgramContent] = useState();
    const [methodology, setMethodology] = useState();
    const [asseessment, setAssessment] = useState();
    const [numberClasses, setNumberClasses] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const handleSave = async (e) => {
        if (!programContent)
            return alert('Você precisa informar o conteúdo programático');
        else if (!methodology)
            return alert('Você precisa informar a metodologia');
        else if (!asseessment)
            return alert('Você precisa informar a atividade avaliativa');
        else if (!numberClasses)
            return alert('Você precisa informar a quantidade de aulas');

        if (match.params.id) {
            api.put(`/week/${match.params.id}`, {
                weekOrder,
                programContent,
                methodology,
                asseessment,
                numberClasses,
                startDate,
                endDate
            });
        } else {
            api.post('/week', {
                weekOrder,
                programContent,
                methodology,
                asseessment,
                numberClasses,
                startDate,
                endDate
            });
        }
    }

    async function loadWeekDetails() {
        await api.get(`/week/${match.params.id}`)
            .then(response => {
                setWeekOrder(response.data.weekOrder);
                setProgramContent(response.data.programContent);
                setMethodology(response.data.methodology);
                setAssessment(response.data.asseessment);
                setNumberClasses(response.data.numberClasses);
                setStartDate(format(new Date(response.data.startDate), 'yyyy-MM-dd'));
                setEndDate(format(new Date(response.data.endDate), 'yyyy-MM-dd'));
            });
    }

    useEffect(() => {
        loadWeekDetails();
    });

    return (
        <>
            <Logo />

            <div className="container-week">
                <div className="order-week">
                    <strong onChange={e => setWeekOrder(e.target.value)}>Semana {weekOrder}</strong>
                    <strong>06/11/2023 à 10/11/2023</strong>
                </div>

                <div className="content-week">
                    <span>Conteúdo Programático</span>
                    <textarea
                        rows="7"
                        onChange={e => setProgramContent(e.target.value)}
                        value={programContent}
                    />

                    <span>Metodologia</span>
                    <textarea
                        rows="7"
                        onChange={e => setMethodology(e.target.value)}
                        value={methodology}
                    />

                    <span>Avaliação</span>
                    <textarea
                        rows="7"
                        onChange={e => setAssessment(e.target.value)}
                        value={asseessment}
                    />

                    <span>Quantidade de Aulas</span>
                    <input
                        type="number"
                        onChange={e => setNumberClasses(e.target.value)}
                        value={numberClasses}
                    />
                </div>

                <button type="submit" onClick={(e) => handleSave(e)}>Salvar</button>
            </div>
        </>
    );
}

export default Week;