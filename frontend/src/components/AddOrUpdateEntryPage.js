import React, {useState, useEffect} from 'react'
import {Button, Col, Form, FormGroup, Input, Row, InputGroup} from 'reactstrap'
import {Container} from './App'
import styled from 'styled-components'
import posed from 'react-pose'
import {toast} from 'react-toastify'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserPlus, faArrowLeft, faSave} from '@fortawesome/free-solid-svg-icons'
import {LinkButton} from './App'

/*
* This component is the AddOrUpdatePage that allows the user to add a contact or update an existing contact.
* */

const ContentLabel = posed.label({
    up: {
        top: '-25px',
        left: '3.5px',
        transform: 'scale(1.1)',
        'font-size': '13px',
        color: 'rgb(97, 97, 97)',
        transition: {duration: 250},
        'z-index': 2,
    },
    down: {
        top: '7px',
        left: '15px',
        transform: 'scale(1)',
        'font-size': '16px',
        color: 'rgb(160, 160, 160)',
        transition: {duration: 250},
        'z-index': 2,
    },
})

const AnimatedLabel = styled(ContentLabel)`
  position: absolute;
  font-size: 15px;
  cursor: text;
`

const AddForm = styled(Form)`
    margin-top: 30px;
`

const PhonenumberRow = styled(Row)`
    margin-top: 25px;
`

const AddButton = styled(Button)`
    margin-top: 15px;
    background: #54CADC !important;
    border: 1px solid #54CADC;
    transition: 0.3s ease-in-out;
    
    :hover {
        color: #54CADC !important;
        background: #FFF !important;
        text-decoration: none;
        border: 1px solid #54CADC;
    }
    
    :focus {
        box-shadow: none !important;
    }
    
    :active {
        border-color: #72AADA !important;
    }
`

const ContactInput = styled(Input)`
    z-index: 10;
    background: transparent !important;
    padding: 0 0 0 10px !important;
`

const BackButton = styled(LinkButton)`
    position: absolute;
    top: 25px;
    left: 25px;
`

export const AddOrUpdateEntryPage = (props) => {

    // State
    const [toggleFirstname, setToggleFirstname] = useState(false)
    const [toggleLastname, setToggleLastname] = useState(false)
    const [togglePhonenumber, setTogglePhonenumber] = useState(false)

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phonenumber, setPhonenumber] = useState('')

    const [firstnameError, setFirstnameError] = useState(false)
    const [lastnameError, setLastnameError] = useState(false)
    const [phonenumberError, setPhonenumberError] = useState(false)

    const updateAction = props.location.type && props.location.type === 'update'

    /*
    * This method is called when the user clicks on the add/update button
    * It checks the data and sends them to the API
    * */
    const addOrUpdateContact = async () => {
        setFirstnameError(false)
        setLastnameError(false)
        setPhonenumberError(false)

        const checkFirstname = firstname && firstname.trim().length > 0,
            checkLastname = lastname && lastname.trim().length > 0,
            checkPhonenumber = phonenumber && phonenumber.match(/^\+\s\d+\s\d+\s\d{6,}$/g)

        const data = {
            firstname,
            lastname,
            phonenumber,
        }

        if (checkFirstname && checkLastname && checkPhonenumber) {
            if (!updateAction) {
                try {
                    await axios.post('http://localhost:3003/contacts', data)

                    toast.success(`The contact has been successfully saved`, {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-success',
                    })
                    props.history.push('/')
                } catch {
                    toast.error("Cannot add the contact", {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-color',
                    })
                }
            } else {
                try {
                    await axios.patch(`http://localhost:3003/contacts/${props.match.params.id}`, data)

                    toast.success(`The contact has been successfully updated`, {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-success',
                    })
                    props.history.push('/')
                } catch {
                    toast.error("Cannot update the contact", {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'toast-color',
                    })
                }
            }
        } else {
            if (!checkFirstname) {
                setFirstnameError(true)
            }
            if (!checkLastname) {
                setLastnameError(true)
            }
            if (!checkPhonenumber) {
                setPhonenumberError(true)
            }

            toast.error("Please fill in the fields correctly", {
                position: toast.POSITION.TOP_RIGHT,
                className: 'toast-color',
            })
        }
    }

    // Set the existing data of the user in the state
    useEffect(() => {
        if (updateAction) {
            setFirstname(props.location.contact.firstname)
            setLastname(props.location.contact.lastname)
            setPhonenumber(props.location.contact.phonenumber)
        }
    }, [props.location, updateAction])

    return (
        <div className="main-container">
            <BackButton to="/"><FontAwesomeIcon icon={faArrowLeft}/> Back</BackButton>
            <Container>
                <h4>{updateAction ? 'Update a contact' : 'Add a new contact'}</h4>
                <AddForm>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <InputGroup>
                                    <AnimatedLabel
                                        pose={
                                            toggleFirstname || firstname.length > 0
                                                ? 'up'
                                                : 'down'
                                        }
                                        HTMLfor="firstname"
                                    >
                                        Firstname
                                    </AnimatedLabel>
                                    <ContactInput
                                        defaultValue={updateAction ? props.location.contact.firstname : null}
                                        type="text"
                                        name="firstname"
                                        id="firstname"
                                        className={firstnameError ? 'is-invalid' : ''}
                                        onFocus={() =>
                                            setToggleFirstname(!toggleFirstname)
                                        }
                                        onBlur={() =>
                                            setToggleFirstname(!toggleFirstname)
                                        }
                                        onChange={e => {
                                            setFirstnameError(false)
                                            setFirstname(e.target.value)
                                        }}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <InputGroup>
                                    <AnimatedLabel
                                        pose={
                                            toggleLastname || lastname.length > 0
                                                ? 'up'
                                                : 'down'
                                        }
                                        HTMLfor="lastname"
                                    >
                                        Lastname
                                    </AnimatedLabel>
                                    <ContactInput
                                        defaultValue={updateAction ? props.location.contact.lastname : null}
                                        type="text"
                                        name="lastname"
                                        id="lastname"
                                        className={lastnameError ? 'is-invalid' : ''}
                                        onFocus={() =>
                                            setToggleLastname(!toggleLastname)
                                        }
                                        onBlur={() =>
                                            setToggleLastname(!toggleLastname)
                                        }
                                        onChange={e => {
                                            setLastnameError(false)
                                            setLastname(e.target.value)
                                        }}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <PhonenumberRow form>
                        <Col md={12}>
                            <FormGroup>
                                <InputGroup>
                                    <AnimatedLabel
                                        pose={
                                            togglePhonenumber || phonenumber.length > 0
                                                ? 'up'
                                                : 'down'
                                        }
                                        HTMLfor="phonenumber"
                                    >
                                        Phonenumber
                                    </AnimatedLabel>
                                    <ContactInput
                                        defaultValue={updateAction ? props.location.contact.phonenumber : null}
                                        type="text"
                                        name="phonenumber"
                                        id="phonenumber"
                                        className={phonenumberError ? 'is-invalid' : ''}
                                        onFocus={() =>
                                            setTogglePhonenumber(!togglePhonenumber)
                                        }
                                        onBlur={() =>
                                            setTogglePhonenumber(!togglePhonenumber)
                                        }
                                        onChange={e => {
                                            setPhonenumberError(false)
                                            setPhonenumber(e.target.value)
                                        }}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </PhonenumberRow>
                    <AddButton onClick={addOrUpdateContact}>
                        <FontAwesomeIcon icon={updateAction ? faSave : faUserPlus}/> {updateAction ? ' Save' : ' Add'}
                    </AddButton>
                </AddForm>
            </Container>
        </div>
    )
}
