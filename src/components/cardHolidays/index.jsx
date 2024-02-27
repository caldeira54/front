import React, { useState, useMemo } from "react";
import { format } from 'date-fns';

import api from '../../services/api';

import './cardHolidays.css';

function CardHolidays({ holiday }) {
    const dateHoliday = useMemo(() => format(new Date(holiday.date), 'dd/MM/yyyy'));
    const [name, setName] = useState(holiday.name);
    const [date, setDate] = useState(dateHoliday);

    const handleSave = async () => {
        await api.put(`/holiday/${holiday.id}`, {
            name,
            date
        });

        alert('Feriado atualizado com sucesso!');
    }

    const handleDelete = async () => {
        const res = window.confirm('Deseja realmente excluir a tarefa?');

        if (res == true) {
            await api.delete(`/holiday/${holiday.id}`)
                .then(response => {
                    alert('Feriado excluído com sucesso!');
                    location.reload();
                });
        }
    }

    return (
        <div className="container-card-holidays">
            <div className="content-card-holidays">
                <div className="data-card-holiday">
                    <span>Nome</span>
                    <input
                        type="text"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                </div>

                <div className="data-card-holiday">
                    <span>Data</span>
                    <input
                        type="date"
                        onChange={e => setDate(e.target.value)}
                        value={date}
                    />
                </div>

                <div className="buttons-holidays">
                    <button className="button-save-holidays" onClick={handleSave}>Salvar</button>
                    <button className="button-delete-holidays" onClick={handleDelete}>Excluir</button>
                </div>
            </div>
        </div>
    );
}

export default CardHolidays;