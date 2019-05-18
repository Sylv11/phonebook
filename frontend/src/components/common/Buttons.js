import React from 'react'
import {LinkButton} from '../App'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPencilAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import {Button} from 'reactstrap'
import {toast} from 'react-toastify'
import axios from 'axios'

/*
* This component is used to redirect to the AddOrUpdateEntryPage with the contact informations or to delete a contact.
* */


export const Buttons = ({value, row,  columnProps: { rest: { setData } }}) => {

    const Update = styled(LinkButton)`
        padding: 4px !important;
        margin: 2px;
        margin-right: 15px;
    `

    const ButtonsContainer = styled.div`
        text-align: center;
    `

    const DeleteButton = styled(Button)`
        background: #E74C3C;
        color: #FFF;
        border: 1px solid #E74C3C;
        margin-top: -5px;
        padding: 5px;
        height: 31px;
        
        :hover {
            color: #E74C3C;
            background: #FFF;
            border: 1px solid #E74C3C;
        }
        
        :focus {
            box-shadow: none !important;
        }
        
        :active {
            background: #E74C3C !important;
            border-color: #E74C3C !important;
        }
    `


    const deleteContact = async () => {
        try {
            await axios.delete(`http://localhost:3003/contacts/${value}`)

            setData()

            toast.success(`The contact has been successfully deleted`, {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-success',
            })
        } catch {
            toast.error("Cannot delete the contact", {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-color',
            })
        }
    }

    // This object provides the route, the action type and the contact informations
    const updateRoute = {
        pathname: `/update/${row.update_col}`,
        type: 'update',
        contact: {
            firstname: row.firstname,
            lastname: row.lastname,
            phonenumber: row.phonenumber,
        }
    }

    return (
        <ButtonsContainer>
            <Update to={updateRoute}><FontAwesomeIcon icon={faPencilAlt}/></Update>
            <DeleteButton onClick={deleteContact}><FontAwesomeIcon icon={faTrashAlt}/></DeleteButton>
        </ButtonsContainer>
    )
}