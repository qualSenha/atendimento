import React, { useState } from 'react'
import './App.css'

import Routes from './routes'
import socket from 'socket.io-client'

function App() {
  const [ra, setRa] = useState()
  const [nome, setNome] = useState()
  const [aluno, setAluno] = useState(false)

  const io = socket('http://localhost:5000')

  io.on('message', data => {
    setRa(data.ra)
    setNome(data.nome)

    if(data.origem == 'aluno')
      setAluno(true)
  })

  function handleFechar() {
    setAluno(false)
  }

  return (
    <div className="App">
      <Routes />

      {aluno ? (
        <div className="alert">

          {nome} enviou nova mensagem <br/>
          <span className="fechar" onClick={handleFechar}>Fechar</span>
          <a href={`/chat/${ra}`} style={{'float':'right'}}>Abrir chat</a>
        </div>
      ) : null}
    </div>
  )
}

export default App