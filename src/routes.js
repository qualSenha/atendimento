import React from 'react'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

import AtendimentoPage from './pages/AtendimentoPage'
import ChatPage from './pages/ChatPage'

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={AtendimentoPage} />
                <Route exact path="/chat" component={ChatPage} />
            </Switch>
        </BrowserRouter>
    )
}