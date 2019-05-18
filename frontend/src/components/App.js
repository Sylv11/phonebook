import React, {useReducer, useEffect} from 'react'
import '../assets/css/style.css'
import 'react-table/react-table.css'
import ReactTable from 'react-table'
import styled from 'styled-components'
import {Spinner} from 'reactstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {toast} from "react-toastify";
import {Buttons} from "./common/Buttons";

/*
* This component is the home page of the application.
* It displays the contacts and allows to the user to add a new one or update an existing one.
* It is a sortable and filterable table with a pagination system.
* */

export const Container = styled.div`
    background: #FFF;
    border-radius: 5px;
    padding: 35px;
    margin: 20px;
    height: fit-content;
`

export const LinkButton = styled(Link)`
    cursor: pointer;
    background: #54CADC;
    color: #FFF;
    border-radius: 5px;
    padding: 10px;
    border: 1px solid #54CADC;
    transition: 0.3s ease-in-out;
    
    :hover {
        color: #54CADC;
        background: #FFF;
        text-decoration: none;
        border: 1px solid #54CADC;
    }
`

const initialState = {
    data: [],
    loading: false,
}

const ACTIONS = {
    START_LOADING: 'START_LOADING',
    SET_DATA: 'SET_DATA',
}

// Return a state according to an action
const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.START_LOADING:
            return {
                ...state,
                loading: true,
            }
        case ACTIONS.SET_DATA:
            return {
                ...initialState,
                data: action.payload,
            }
        default:
            throw new Error('Action type not found')
    }
}

export const App = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    // Get all the contacts from the API
    const setData = async () => {
        dispatch({type: ACTIONS.START_LOADING})
        const {data} = await axios.get('http://localhost:3003/contacts')

        try {
            dispatch({
                type: ACTIONS.SET_DATA,
                payload: data,
            })
        } catch {
            toast.error("Cannot get your contacts", {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-color',
            })
        }
    }

    const columns = [{
        Header: 'Firstname',
        accessor: 'firstname',
    }, {
        Header: 'Lastname',
        accessor: 'lastname',
    }, {
        Header: 'Phonenumber',
        accessor: 'phonenumber',
    }, {
        id: 'update_col',
        accessor: 'id',
        filterable: false,
        sortable: false,
        Cell: Buttons,
        getProps: () => ({setData})
    }]

    useEffect(() => {
        setData()
    }, [])

    return (
        <div className="main-container">
            <LinkButton to="/add"><FontAwesomeIcon icon={faPlus}/> Add a new entry</LinkButton>
            <Container>
                {!state.loading ? (
                    <ReactTable
                        data={state.data}
                        columns={columns}
                        filterable
                        pageSizeOptions={[5, 10, 20, 50, 100]}
                        defaultPageSize={5}
                    />
                ) : <Spinner type="grow" color="primary"/>}
            </Container>
        </div>
    )
}
