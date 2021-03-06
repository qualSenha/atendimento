import React, { useState, useEffect } from 'react'

import socket from 'socket.io-client'
import logo from '../assets/img/Logos.png'
import api from '../services/api'
import moment from 'moment-timezone'

export default function ChatPage({ match }) {
    const [mensagens, setMensagens] = useState([])
    const [mensagem, setMensagem] = useState('')

    useEffect(() => {
        document.getElementById('chat').scrollTop = document.getElementById('chat').scrollHeight
    },[])

    useEffect(() => {
        async function loadMensagens() {
            const response = await api.get(`/getChat?ra=${match.params.ra}`)

            setMensagens(response.data)
        }

        loadMensagens()
    })
    
    async function handleSubmit(event) {
        event.preventDefault()
        
        const io = socket('http://localhost:5000')
        
        io.emit('add-message', { 
            text: mensagem,
            nickname: 'Atendimento',
            ra: match.params.ra,
            origem: 'atendimento',
            data: moment(new Date()).tz('America/Sao_Paulo').format('DD-MM-YYYY HH:mm:ss')
        })

        setMensagem('')
    }

    return (
        <>
            <div className="main-container">
                <img src={logo} alt="" height="100" />
                <a href="/">Voltar para a tela inicial</a>

                <div id="chat" className="chat">
                    {mensagens.map(msg => (
                        <div className={`balao ${msg.origem != 'aluno' ? 'balao-right' : null}`} key={msg.data}>
                            <span className="ra">{msg.origem == 'aluno' ? match.params.ra : 'Atendimento'}</span>
                            <span className="msg">{msg.text}</span>
                            <span className="data">{msg.data}</span>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="send">
                        <input 
                            type="text"
                            value={mensagem}
                            onChange={e => setMensagem(e.target.value)}
                        />
                        <button>Enviar</button>
                    </div>
                </form>

            </div>
        </>
    )
}