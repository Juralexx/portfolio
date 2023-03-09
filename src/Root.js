import React from "react"
import PropTypes from "prop-types"
import ThemeContextWrapper from "components/tools/theme/ThemeContextWrapper"
import FormContextProvider from "components/contexts/FormContext"
// import PlayerContextProvider from "components/contexts/PlayerContext"
import Navbar from "./components/Navbar"
import Footer from "components/Footer"
import Loader from "components/Loader"
import FormModal from "components/FormModal"
import Socials from "components/Socials"
import SmallLoader from "components/SmallLoader"
// import Player from "components/tools/audio/Player"

import useReadLocalStorage from "components/tools/hooks/useReadLocalStorage"

import styled, { css } from "styled-components"
import GlobalStyles from "styles/GlobalStyles"
import 'styles/dist/root.css'
import 'styles/dist/font.css'
import 'styles/dist/containers-cols.css'
import 'styles/dist/classes.css'
import 'styles/dist/tarteaucitron.css'
import 'styles/dist/noscript.css'

const Root = ({ children, location }) => {   
    const [isLoading, setLoading] = React.useState(true)

    React.useEffect(() => window.scrollTo(0, 0), [])

    React.useEffect(() => {
        if (isLoading) return
        if (location.hash.length > 0) {
            let el = document.getElementById(location.hash.substring(1))
            if (el) {
                el.scrollIntoView()
                el.focus()
            }
        }
    }, [isLoading, location])

    const theme = useReadLocalStorage('theme')

    React.useEffect(() => {
        if (location.pathname === '/')
            document.body.classList.add('front', 'highlighted')
        else document.body.classList.remove('front', 'highlighted')
    }, [location.pathname])

    return (
        <ThemeContextWrapper>
            <GlobalStyles />
            {location.pathname === '/' ? (
                <Loader finishLoading={() => setLoading(false)} />
            ) : (
                <SmallLoader finishLoading={() => setLoading(false)} />
            )}
            <FormContextProvider>
                <RootContainer isHome={location.pathname === '/'} theme={theme}>
                    <Navbar isHome={location.pathname === '/'} />
                    {/* {typeof window !== 'undefined' &&
                        <PlayerContextProvider>
                            <Player />
                        </PlayerContextProvider>
                    } */}
                    {children}
                    <Socials />
                    <FormModal />
                    <Footer />
                </RootContainer>
            </FormContextProvider>
        </ThemeContextWrapper>
    )
}

Root.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Root

const RootContainer = styled.div`
    position       : relative;
    height         : auto;
    min-height     : 100vh;
    width          : 100vw;
    padding-bottom : 346px;
    overflow-x     : hidden;

    @media(max-width:768px) {
        padding-bottom : 704px;
    }

    ${props =>
        props.isHome
        && props.theme === 'dark'
        && css`

        &:before {
            content          : '';
            position         : fixed;
            top              : 0;
            right            : 0;
            height           : 200px;
            width            : 200px;
            background-color : var(--primary);
            filter           : blur(160px);
        }

        &:after {
            content          : '';
            position         : fixed;
            bottom           : 200px;
            right            : 300px;
            height           : 200px;
            width            : 200px;
            background-color : rgb(var(--blue-rgb));
            filter           : blur(160px);
        }
    `};
`
