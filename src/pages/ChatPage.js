import React, { useState } from 'react'

import Socket from 'socket.io-client'
import logo from '../assets/img/Logos.png'
import moment from 'moment-timezone'

export default function ChatPage() {
    const [data, setData] = useState([])
    const [mensagem, setMensagem] = useState('')
    var teste = []

    const socket = Socket('localhost:5000')

    function handleSend() {
        socket.emit('add-message', { text: mensagem, nickname: 'Atendimento' })
    }

    socket.on('message', function (data) {
        teste.push(data)
        setData(teste)

        console.log(data)
    })

    return (
        <>
            <div className="main-container">
                <img src={logo} alt="" height="100" />

                <div className="chat">
                </div>
            </div>
        </>
    )
}