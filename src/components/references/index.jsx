import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import api from '../../services/api';

import idIdentification from '../../utils/idIdentification';

import './references.css';

export default function References({ id }) {
    const [idReference, setIdeReference] = useState();
    const [basic, setBasic] = useState();
    const [additional, setAdditional] = useState();
    const [date, setDate] = useState();
    const [referenceLoaded, setReferenceLoaded] = useState(false);
    const [message, setMessage] = useState();
    const [errorMessage, setErrorMessage] = useState()

    const loadReference = async () => {
        await api.get(`/reference/all/${id}`)
            .then(response => {
                setIdeReference(response.data[0].id);
                setBasic(response.data[0].basic);
                setAdditional(response.data[0].additional);
                setDate(response.data[0].date);
                setReferenceLoaded(true);
            });
    }

    useEffect(() => {
        if (!referenceLoaded)
            loadReference();
    }, [referenceLoaded]);

    const handleSave = async () => {
        if (!basic) {
            document.getElementById('1').focus();
            setErrorMessage('Preencha todos os campos');
            return document.getElementById('1').classList.add('error-border');
        } else {
            document.getElementById('1').classList.remove('error-border');
        }

        if (!additional) {
            document.getElementById('2').focus();
            setErrorMessage('Preencha todos os campos');
            return document.getElementById('2').classList.add('error-border');
        } else {
            document.getElementById('2').classList.remove('error-border');
        }

        if (!date) {
            document.getElementById('3').focus();
            setErrorMessage('Preencha todos os campos');
            return document.getElementById('3').classList.add('error-border');
        } else {
            document.getElementById('3').classList.remove('error-border');
        }

        if (id) {
            api.put(`/reference/${idReference}`, {
                idIdentification: id,
                basic,
                additional,
                date
            })
                .then(response => {
                    setMessage('Atualização realizada com sucesso!');
                    openModal();
                });
        } else {
            api.post('/reference', {
                idIdentification: `${idIdentification}`,
                basic,
                additional,
                date
            })
                .then(() => {
                    setMessage('Cadastro realizado com sucesso!');
                    openModal();
                })
        }
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className='content-references'>
            <div className="input-references">
                <label>Básicas:</label>
                <textarea id='1'
                    rows="7"
                    onChange={e => setBasic(e.target.value)}
                    value={basic}
                />
            </div>
            <div className="input-references">
                <label>Complementares:</label>
                <textarea id='2'
                    rows="7"
                    onChange={e => setAdditional(e.target.value)}
                    value={additional}
                ></textarea>
            </div>
            <div className='input-references'>
                <label>Data:</label>
                <input id='3'
                    type='date'
                    maxLength='10'
                    className='date'
                    onChange={e => setDate(e.target.value)}
                    value={date}
                />
            </div>

            <button className='button-save-references' onClick={handleSave}>Salvar</button>

            <span className='error-message'>{errorMessage}</span>

            <Modal
                className='modal'
                isOpen={modalIsOpen}
                ariaHideApp={false}
                onRequestClose={closeModal}
            >
                <div className='modal-content'>
                    <span>{message}</span>
                    <button className='button-confirm' onClick={closeModal}>OK</button>
                </div>
            </Modal>

        </div>
    )
}