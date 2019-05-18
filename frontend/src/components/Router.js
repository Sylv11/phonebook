import React from 'react'
import {Switch, Route} from 'react-router'
import {App} from './App'
import {AddOrUpdateEntryPage} from './AddOrUpdateEntryPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {NotFoundPage} from './NotFoundPage'

/*
* Router component that render a component according to a path.
* */

export const Router = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={App}/>
                <Route exact path='/add' component={AddOrUpdateEntryPage}/>
                <Route exact path='/update/:id?' component={AddOrUpdateEntryPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
            <ToastContainer />
        </div>
    )
}
