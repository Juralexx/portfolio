import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Main = (props) => {
    return (
        <MainContainer>
            {props.children}
        </MainContainer>
    )
}

export default Main

Main.propTypes = {
    children: PropTypes.node.isRequired,
}

const MainContainer = styled.main`
    width      : 100%;
    max-width  : 1400px;
    min-height : 100vh;
    margin     : 0 auto;
    padding    : 150px 100px;

    h1 {
        font-size   : 50px;
        line-height : 56px;
    }

    @media(max-width: 992px) {
        padding : 130px 30px;
    }
    @media(max-width: 768px) {
        padding : 130px 15px;

        h1 {
            font-size   : 35px;
            line-height : 41px;
        }
    }
    @media(max-width: 576px) {
        padding : 130px 0;
    }
`