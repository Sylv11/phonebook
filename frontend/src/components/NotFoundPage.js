import React from 'react'
import {LinkButton} from './App'
import styled from 'styled-components'

const NotFoundButton = styled(LinkButton)`
    position: absolute;
    left: 75px;
    bottom: 150px;
`

export const NotFoundPage = () => {
    return (
        <div className="main-container not-found">
            <NotFoundButton to="/">Go back home</NotFoundButton>
        </div>
    )
}