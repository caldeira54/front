import React, { useMemo, useState } from "react";
import { format } from "date-fns";

import api from '../../services/api';

import "./card.css";

function Card({ week }) {
    const initialDate = useMemo(() => format(new Date(week.startDate), 'dd/MM/yyyy'));
    const finalDate = useMemo(() => format(new Date(week.endDate), 'dd/MM/yyyy'));
    const [programContent, setProgramContent] = useState(week.programContent);
    const [methodology, setMethodology] = useState(week.methodology);
    const [assessment, setAssessment] = useState(week.assessment);
    const [numberClasses, setNumberClasses] = useState(week.numberClasses);
    const [savedSuccessfully, setSavedSuccessfully] = useState(false);

    const handleSave = async () => {
        await api.put(`/week/${week.id}`, {
            programContent,
            methodology,
            assessment,
            numberClasses,
        });

        setSavedSuccessfully(true);
    }

    return (
        <>
            <div className="container-card">
                <div className="content-card">
                    <div className="week-order">
                        <strong>Semana {week.weekOrder}</strong>
                        <strong>{initialDate} à {finalDate}</strong>
                    </div>

                    <div className="data-card">
                        <div className="content-span">
                            <strong>Conteúdo Programático</strong>
                            <textarea
                                rows="4"
                                className="text"
                                onChange={(e) => setProgramContent(e.target.value)}
                                value={programContent}>
                            </textarea>
                        </div>

                        <div className="content-span">
                            <strong>Metodologia</strong>
                            <textarea
                                rows="4"
                                className="text"
                                onChange={(e) => setMethodology(e.target.value)}
                                value={methodology}>
                            </textarea>
                        </div>

                        <div className="content-span">
                            <strong>Avaliação</strong>
                            <textarea
                                rows="4"
                                className="text"
                                onChange={(e) => setAssessment(e.target.value)}
                                value={assessment}>
                            </textarea>
                        </div>

                        <div className="content-span">
                            <strong>Quantidade de Aulas</strong>
                            <input
                                type="text"
                                className="text"
                                onChange={(e) => setNumberClasses(e.target.value)}
                                value={numberClasses}
                            />
                        </div>

                        {savedSuccessfully &&
                            <div className="saved">
                                <span>Dados salvos com sucesso!</span>
                            </div>
                        }
                    </div>

                    <div>
                        <button className="button-save-card" onClick={handleSave}>Salvar</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;