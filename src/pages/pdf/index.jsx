import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Modal from 'react-modal';
import { format } from "date-fns";

import generatePDF, { Margin } from 'react-to-pdf';

import './pdf.css';

import isConnected from '../../utils/isConnected';

import api from '../../services/api';

import CoatOfArms from '../../assets/img/coatofarms.png';
import Back from '../../assets/img/back.png';

const recoverContentPdf = () => document.getElementById('content');
const customization = {
    // Baixar = save ou Abrir = open
    method: 'save',

    page: {
        // Tamanho da margem, pode ser SMALL ou MEDIUM
        margin: Margin.SMALL,
        // Tamanho da página, pode ser A4 ou letter
        format: 'A4',
        // Orientação do arquivo, pode ser portrait ou landscape
        orientation: 'portrait',
    },
}

export default function Pdf() {
    const { id, idCourse } = useParams();
    const [identification, setIdentification] = useState([]);
    const [weeks, setWeeks] = useState([]);
    const [reference, setReference] = useState([]);
    const [course, setCourse] = useState();
    const [loadedDatas, setLoadedDatas] = useState(false);

    const showCourse = () => {
        api.get(`/course/${idCourse}`)
            .then(response => {
                setCourse(response.data.name);
            })
    }

    async function loadDatas() {
        await api.get(`/identification/show/${id}`)
            .then(response => {
                setIdentification(response.data);
                showCourse();
            });

        await api.get(`/week/all/${id}`)
            .then(response => {
                setWeeks(response.data);
            });

        await api.get(`/reference/all/${id}`)
            .then(response => {
                setReference(response.data);
                setLoadedDatas(true);
            });
    }

    useEffect(() => {
        if (!loadedDatas)
            loadDatas();
    }, [loadedDatas]);

    const navigate = useNavigate();

    const handleDelete = async () => {
        await api.delete(`/week/${id}`)

        await api.delete(`/reference/${id}`);

        await api.delete(`/identification/${id}`)
            .then(response => {
                navigate('/listing')
            });
    }

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        return format(dateObj, 'dd/MM/yyyy');
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = (item) => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <div className="back">
                <Link to="../listing"><img src={Back} alt="Voltar" /></Link>
            </div>

            <div className="container-pdf" id="content">
                <div className="header-pdf">
                    <img src={CoatOfArms} alt="Brasão" />

                    <span>MINISTÉRIO DA EDUCAÇÃO</span>

                    <span>SECRETÁRIA DE EDUCAÇÃO PROFISSIONAL E TECNOLÓGIA</span>

                    <span>INSTITUO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLÓGIA DE MINAS GERAIS</span>

                    <span>CAMPUS SÃO JOÃO EVANGELISTA</span>

                    <span className="span-address">Avenida Primeiro de Junho, nº. 1043, Bairro Centro, São João Evangelista, CEP 39705-000, Estado de Minas Gerais</span>
                </div>

                <div className='content-checkbox-pdf'>
                    <div className="input-wrapper-checkbox-pdf">
                        <input
                            type="checkbox"
                            checked={identification.scope === 'Trimestral'}
                        />
                        Trimestral
                    </div>

                    <div className="input-wrapper-checkbox-pdf">
                        <input
                            type="checkbox"
                            checked={identification.scope === 'Semestral'}
                        />
                        Semestral
                    </div>
                </div>

                <div className="content-pdf">
                    <div className="session-pdf">
                        <span className="title-session-pdf">1.IDENTIFICAÇÃO</span>

                        <div className="two-elements">
                            <span className="left">Disciplina: {identification.discipline}</span>
                            <span className="rigth">Carga horária: {identification.totalWorkload} horas</span>
                        </div>

                        <span className="teacher-pdf">Professor: {identification.teacher}</span>

                        <div className="two-elements">
                            <span className="left">Ano: {identification.year}</span>
                            <span className="rigth">Série/período: {identification.period}</span>
                        </div>

                        <div className="two-elements">
                            <span className="left">Curso: {course}</span>
                            <span className="rigth">Turma: {identification.team}</span>
                        </div>
                    </div>

                    <div className="session-pdf">
                        <span className="title-session-pdf">2.ORGANIZAÇÃO DIDÁTICA</span>

                        <div className="menu-and-objective">
                            <p className="p-menu">Ementa: {identification.courseProgram}</p>
                            <p>Objetivo: {identification.objective}</p>
                        </div>

                        <div className="table-pdf">
                            <table>
                                <tr>
                                    <td>Sequência de aulas</td>
                                    <td>Conteúdo Programático</td>
                                    <td>Metodologia</td>
                                    <td>Atividade Avaliativa</td>
                                    <td>Nº de Aulas</td>
                                </tr>
                                {
                                    weeks.map((w) => (
                                        <tr>
                                            <td>Semana {w.weekOrder} {formatDate(w.startDate)} à {formatDate(w.endDate)}</td>
                                            <td>{w.programContent}</td>
                                            <td>{w.methodology}</td>
                                            <td>{w.assessment}</td>
                                            <td>{w.numberClasses}</td>
                                        </tr>
                                    ))
                                }
                            </table>
                        </div>
                    </div>

                    <div className="session-pdf">
                        <span className="title-session-pdf">3.REFERÊNCIAS</span>

                        <div className="datas-references-pdf">
                            <span>Básicas:</span>
                            <p>{reference.length > 0 ? reference[0].basic : ''}</p>
                        </div>

                        <div className="datas-references-pdf">
                            <span>Complementares:</span>
                            <p>{reference.length > 0 ? reference[0].additional : ''}</p>
                        </div>

                        <div className="date-pdf">
                            <span className="date-final-pdf">Data: {reference.length > 0 ? formatDate(reference[0].date) : ''}</span>
                            <span className="signature">Assinatura:</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='buttons'>
                <button className='button-delete' onClick={openModal}>Excluir</button>

                <Link to={`/edit/${id}/${idCourse}`}>
                    <button className='button-update'>Editar</button>
                </Link>

                <button
                    className='button-download'
                    onClick={() => generatePDF(recoverContentPdf, customization)}
                >
                    Download
                </button>
            </div >

            <Modal
                className='modal'
                isOpen={modalIsOpen}
                ariaHideApp={false}
                onRequestClose={closeModal}
            >
                <div className='modal-content'>
                    <span>Deseja realizar a exclusão?</span>
                    <div>
                        <button className='button-delete' onClick={handleDelete}>Excluir</button>
                        <button className='button-cancel' onClick={closeModal}>Cancelar</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}