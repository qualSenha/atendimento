import React, { useState, useEffect } from 'react'

import logo from '../assets/img/Logos.png'
import api from '../services/api'
import moment from 'moment-timezone'

export default function AtendimentoPage() {
    const [agendamentos, setAgendamentos] = useState([])
    const [senhas, setSenhas] = useState([])
    const [local, setLocal] = useState('')
    const [atual, setAtual] = useState('')

    useEffect(() => {
        async function loadAgendamentos() {
            if(!local)
                setLocal('anaRosa')

            const response = await api.get(`/getAgendamentos?local=${local}`)
            console.log('agend', response.data)
            setAgendamentos(response.data)
        }

        async function loadSenhas() {
            if(!local)
                setLocal('anaRosa')

            const response = await api.get(`/getSenhas?local=${local}`)

            setSenhas(response.data)
        }

        loadAgendamentos()
        loadSenhas()
    })

    async function handleAgendamento() {
        const response = await api.get(`/chamarAgendamento?local=${local}`)

        setAtual(response.data.ra)
    }

    async function handleSenha() {
        const response = await api.get(`/chamarSenha?local=${local}`)

        setAtual(response.data.senha)
    }

    return (
        <>
            <div className="main-container">
                <img src={logo} alt="" height="100" />

                <p>Chamar a próxima senha</p>

                <div className="guiche">
                    <span>Guichê</span>
                    <select name="guiche" id="guiche">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    &nbsp;
                    <span>Local</span>
                    <select name="local" id="local" onChange={e => setLocal(e.target.value)}>
                        <option value="anaRosa">Ana Rosa</option>
                        <option value="anhangabau">Vale do Anhangabaú</option>
                        <option value="predioTres">Liberdade Prédio 3</option>
                        <option value="saoBernardo">São Bernardo do Campo</option>
                        <option value="brigadeiro">Brigadeiro</option>
                        <option value="predioDez">Liberade Prédio 10</option>
                        <option value="ponteEstaiada">Ponte Estaiada</option>
                        <option value="itaimBibi">Itaim Bibi</option>
                        <option value="posGraduacao">Centro de Pós-Graduação</option>
                        <option value="vilaMarianaI">Vila Mariana I</option>
                        <option value="vilaMarianaII">Vila Mariana II</option>
                        <option value="santoAmaro">Santo Amaro</option>
                        <option value="morumbi">Morumbi</option>
                        <option value="liberdade">Liberdade</option>
                    </select>
                </div>

                <div className="buttons">
                    <button onClick={handleAgendamento}>Agendada</button>
                    <button onClick={handleSenha}>Normal</button>
                    <button>Chamar de novo</button>
                </div>

                <div className="painel">
                    <div className="senha">
                        Atual: <span id="senha">{ atual }</span>
                    </div>
                    <p>Painel de senhas</p>
                    <div className="senhas">
                        <table className="agendadas">
                            <thead>
                                <tr>
                                    <th colSpan="2">Agendadas</th>
                                </tr>
                                <tr>
                                    <th>RA</th>
                                    <th>Horário</th>
                                </tr>
                            </thead>
                            <tbody>
                                {agendamentos.map(agendamento => (
                                    <tr key={agendamento.ra}>
                                        <td>{agendamento.ra}</td>
                                        <td>{moment(agendamento.horaAtendimento).format('HH:mm')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <table className="geral">
                            <thead>
                                <tr>
                                    <th>Geradas</th>
                                </tr>
                                <tr>
                                    <th>Senha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {senhas.map(senha => (
                                    <tr key={senha.id}>
                                        <td>{ senha.senha }</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}