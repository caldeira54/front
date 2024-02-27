import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import api from '../../services/api';

import isConnected from '../../utils/isConnected';

import './identification.css';

export default function Identification({ id }) {
    const [teacher, setTeacher] = useState();
    const [course, setCourse] = useState();
    const [year, setYear] = useState(new Date().getFullYear());
    const [team, setTeam] = useState();
    const [discipline, setDiscipline] = useState();
    const [totalWorkload, setTotalWorkload] = useState();
    const [period, setPeriod] = useState();
    const [courseProgram, setCourseProgram] = useState();
    const [objective, setObjective] = useState();
    const [scope, setScope] = useState();
    const [teacherLoaded, setTeacherLoaded] = useState(false);
    const [disciplineLoaded, setDisciplineLoaded] = useState(false);
    const [courses, setCourses] = useState([]);
    const [disciplines, setDisciplines] = useState([]);
    const [idCourse, setIdCourse] = useState();
    const [scopeCheckbox, setScopeCheckbox] = useState('');
    const [identificationLoaded, setIdentificationLoaded] = useState(false);
    const [message, setMessage] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    const loadIdentification = async () => {
        await api.get(`identification/show/${id}`)
            .then(response => {
                setScopeCheckbox(response.data.scope);
                setScope(response.data.scope);
                setTeacher(response.data.teacher);
                setCourse(response.data.course);
                setYear(response.data.year);
                setTeam(response.data.team);
                setDiscipline(response.data.discipline);
                setTotalWorkload(response.data.totalWorkload);
                setPeriod(response.data.period);
                setCourseProgram(response.data.courseProgram);
                setObjective(response.data.objective);
                setIdCourse(response.data.idCourse);
                setIdentificationLoaded(true);
            })
    };

    useEffect(() => {
        if (!identificationLoaded)
            loadIdentification();
    }, [identificationLoaded]);

    const showTeacher = async () => {
        await api.get(`/identification/${isConnected}`)
            .then(response => {
                const user = response.data;

                setTeacher(user.name);
                setTeacherLoaded(true);
            });
    }

    const handleSave = async () => {

        let hasError = false;

        if (!course) {
            hasError = true;
            document.getElementById('1').setAttribute('className', 'error-border');
            setErrorMessage('Preencha todos os campos');
            return document.getElementById('1').focus();
        } else {
            document.getElementById('2').classList.remove('error-border');
        }

        if (!discipline) {
            hasError = true;
            document.getElementById('2').setAttribute('className', 'error-border');
            setErrorMessage('Preencha todos os campos');
            return document.getElementById('2').focus();
        }

        if (!totalWorkload) {
            hasError = true;
            document.getElementById('3').setAttribute('className', 'error-border');
            setErrorMessage('Preencha todos os campos');
            return document.getElementById('3').focus();
        } else {
            document.getElementById('3').classList.remove('error-border');
        }


        if (!year) {
            hasError = true;
            document.getElementById('4').classList.add('error-border');
            setErrorMessage('Preencha todos os campos');
            return document.getElementById('4').focus();
        } else {
            document.getElementById('4').classList.remove('error-border');
        }

        if (!team) {
            hasError = true;
            document.getElementById('5').classList.add('error-border');
            setErrorMessage('Preencha todos os campos');
            return document.getElementById('5').focus();
        } else {
            document.getElementById('5').classList.remove('error-border');
        }

        if (!period) {
            hasError = true;
            document.getElementById('7').setAttribute('className', 'error-border');
            setErrorMessage('Preencha todos os campos');
            return document.getElementById('7').focus();
        } else {
            document.getElementById('7').classList.remove('error-border');
        }

        if (!courseProgram) {
            hasError = true;
            document.getElementById('8').classList.add('error-border');
            setErrorMessage('Preencha todos os campos');
            return document.getElementById('8').focus();
        } else {
            document.getElementById('8').classList.remove('error-border');
        }

        if (!objective) {
            hasError = true;
            document.getElementById('9').classList.add('error-border');
            setErrorMessage('Preencha todos os campos');
            return document.getElementById('9').focus();
        } else {
            document.getElementById('9').classList.remove('error-border');
        }

        if (!scope) {
            hasError = true;
            return setErrorMessage('Preencha todos os campos');
        }

        if (id) {
            await api.put(`/identification/${id}`, {
                teacher,
                idUser: isConnected,
                idCourse: idCourse,
                course,
                year,
                team,
                discipline,
                totalWorkload,
                period,
                courseProgram,
                objective,
                scope
            }).then(response => {
                sessionStorage.setItem('@ppt/idIdentification', response.data.id);
                setMessage('Atualização realizada com sucesso!');
                openModal();
            });
        } else {
            await api.post('/identification', {
                teacher,
                idUser: isConnected,
                idCourse: idCourse,
                course,
                year,
                team,
                discipline,
                totalWorkload,
                period,
                courseProgram,
                objective,
                scope
            }).then(response => {
                sessionStorage.setItem('@ppt/idIdentification', response.data.id);
                setMessage('Cadastro realizado com sucesso!');
                openModal();
            });
        }
    };

    const loadDiscipline = async () => {
        await api.get(`/discipline/all/${idCourse}`)
            .then(response => {
                setDisciplines(response.data);
                setDisciplineLoaded(true);
            })
    };

    useEffect(() => {
        if (!teacherLoaded)
            showTeacher();
    }, [teacherLoaded]);

    useEffect(() => {
        if (idCourse) {
            loadDiscipline();
        }
    }, [idCourse]);

    useEffect(() => {
        api.get('/course/all')
            .then(response => {
                setCourses(response.data);
            })
    }, []);

    const handleSelectChange = (e) => {
        setIdCourse(e.target.selectedOptions[0].getAttribute('course-id'));
        setCourse(e.target.value);
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const selectScope = (e) => {
        setScopeCheckbox(e.target.value);
        setScope(e.target.value);
    }

    return (
        <>
            <div className='checkbox-wrapper'>
                <label>Tipo:</label>
                <div className='content-checkbox'>
                    <div className="input-wrapper-checkbox">
                        <input
                            type="checkbox"
                            value="Trimestral"
                            checked={scopeCheckbox === 'Trimestral'}
                            onChange={e => selectScope(e)}
                        />
                        Trimestral
                    </div>

                    <div className="input-wrapper-checkbox">
                        <input
                            type="checkbox"
                            value="Semestral"
                            checked={scopeCheckbox === 'Semestral'}
                            onChange={e => selectScope(e)}
                        />
                        Semestral
                    </div>
                </div>
            </div>

            <div className='input-group'>
                <div className="input-wrapper">
                    <label>Curso:</label>
                    <select
                        id='1'
                        className={course ? '' : 'error-border'}
                        value={course}
                        onChange={handleSelectChange}
                    >
                        <option value=""></option>
                        {
                            courses.map(c => (
                                <option title={c.name} course-id={c.id} value={c.name}>{c.name.length > 30 ? `${c.name.substring(0, 30)}...` : c.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="input-wrapper">
                    <label>Disciplina:</label>
                    <select id='2' className={discipline ? '' : 'error-border'} value={discipline} onChange={e => setDiscipline(e.target.value)}>
                        <option value=""></option>
                        {
                            disciplines.map(d => (
                                <option title={d.name} value={d.name}>{d.name.length > 30 ? `${d.name.substring(0, 30)}...` : d.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="input-wrapper">
                    <label>Carga Horária:</label>
                    <select className={totalWorkload ? '' : 'error-border'} id='3' value={totalWorkload} onChange={e => setTotalWorkload(e.target.value)}>
                        <option selected disabled></option>
                        <option value="30">30</option>
                        <option value="60">60</option>
                        <option value="90">90</option>
                    </select>
                </div>

                <div className="input-wrapper">
                    <label>Ano:</label>
                    <input id='4'
                        className='input-id'
                        type="text"
                        onChange={e => setYear(e.target.value)}
                        value={year}
                        readOnly
                    />
                </div>

                <div className="input-wrapper">
                    <label>Turma:</label>
                    <input id='5'
                        className='input-id'
                        type="text"
                        onChange={e => setTeam(e.target.value)}
                        value={team}
                    />
                </div>

                <div className="input-wrapper">
                    <label>Professor:</label>
                    <input id='6'
                        className='input-id'
                        type="text"
                        value={teacher}
                        readOnly
                    />
                </div>

                <div className="input-wrapper">
                    <label>Período/Série:</label>
                    <select className={period ? '' : 'error-border'} id='7' value={period} onChange={e => setPeriod(e.target.value)}>
                        <option selected disabled></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div className="input-wrapper">

                </div>
            </div >
            <div className='container-last'>
                <div className="input-last">
                    <label>Ementa:</label>
                    <textarea id='8'
                        rows="7"
                        onChange={e => setCourseProgram(e.target.value)}
                        value={courseProgram}
                    ></textarea>
                </div>
                <div className="input-last">
                    <label>Objetivo:</label>
                    <textarea id='9'
                        rows="7"
                        onChange={e => setObjective(e.target.value)}
                        value={objective}
                    ></textarea>
                </div>
            </div>

            <div className='button-save'>
                <button className='button-save-identification' onClick={handleSave}>Salvar</button>
            </div>

            <section className='message-empty-fields'>
                <span>{errorMessage}</span>
            </section>

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
        </>
    );
}