import React, { useState, useEffect } from 'react'

import logo from '../assets/img/Logos.png'
import api from '../services/api'
import moment from 'moment-timezone'

export default function AtendimentoPage() {
    const [agendamentos, setAgendamentos] = useState([])

    useEffect(() => {
        async function loadAgendamentos() {
            const response = await api.get('/getAgendamentos')
            console.log(response)
            setAgendamentos(response.data)
        }

        loadAgendamentos()
    })

    return (
        <>
            <div className="main-container">
                <img src={logo} alt="" height="100" />

                <p>Chamar a próxima senha</p>

                <div className="guiche">
                    <span>Guichê</span>
                    <select name="" id="">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <div className="buttons">
                    <button>Agendada</button>
                    <button>Normal</button>
                    <button>Chamar de novo</button>
                </div>

                <div className="painel">
                    <div className="senha">
                        Atual: <span id="senha">A103</span>
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
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}