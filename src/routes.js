import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import AtendimentoPage from './pages/AtendimentoPage'
import ChatPage from './pages/ChatPage'
import ListaPage from './pages/ListaPage'

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={AtendimentoPage} />
                <Route exact path="/chat/:ra" component={ChatPage} />
                <Route exact path="/lista" component={ListaPage} />
            </Switch>
        </BrowserRouter>
    )
}