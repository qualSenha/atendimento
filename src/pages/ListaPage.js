import React, { useState, useEffect } from 'react'

import logo from '../assets/img/Logos.png'
import api from '../services/api'
import moment from 'moment-timezone'

export default function AtendimentoPage() {
    const [pessoas, setPessoas] = useState([])

    useEffect(() => {
        async function loadPessoas() {

            const response = await api.get(`/getChamados`)

            setPessoas(response.data)
        }

        loadPessoas()
    })

    return (
        <>
            <div className="main-container">
                <img src={logo} alt="" height="100" />

                <p>Conversas ativas hoje</p>

                <div className="lista">
                        <table>
                            <thead>
                                <tr>
                                    <th>RA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pessoas.map(ra => (
                                    <tr key={ra}>
                                        <td><a href={`/chat/${ra}`}>{ra}</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </div>
        </>
    )
}