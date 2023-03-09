import React from "react"
import styled from "styled-components"
import Root from "../Root"
import Head from "../Head"
import { OutlinedLinkButton } from "components/tools/global/Buttons/OutlinedButton"
import { navigate } from "@reach/router"

const NotFoundPage = ({ location }) => {
    const [count, setCount] = React.useState(10)

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (count === 0)
                return navigate('/')
            else return setCount(count - 1)
        }, 1000)
        return () => clearTimeout(timer)
    }, [count])

    return (
        <Root location={location}>
            <Head title="Page introuvable" />
            <Error className="container-lg">
                <div className="__content">
                    <p className="__title">404</p>
                    <p>La page que vous recherchez est introuvable.</p>
                    <img
                        src="/404.png"
                        alt="Erreur 404 - Page introuvable"
                    />
                    <span>Redirection automatique : {count}</span>
                    <OutlinedLinkButton to="/">
                        Revenir à l'accueil
                    </OutlinedLinkButton>
                </div>
            </Error>
        </Root>
    )
}

export default NotFoundPage

const Error = styled.main`
    height          : calc(100vh + 80px);
    display         : flex;
    flex-direction  : column;
    justify-content : center;
    align-items     : center;
    text-align      : center;

    @media(min-width:1921px) {
        padding-top : 80px;
        max-height  : 800px;
    }

    img {
        width     : 100%;
        height    : auto;
        margin    : 30px auto;
        transform : rotate(-20deg);
    }

    .__content {
        position       : relative;
        display        : flex;
        flex-direction : column;
        align-items    : center;
        width          : 70%;
        margin         : auto;
    }

    .__title {
        color         : var(--primary);
        line-height   : 120px;
        font-size     : 120px;
        font-weight   : 700;
        margin-bottom : 0;
        font-family   : var(--font-fam2);
    }

    span {
        font-size     : 14px;
        font-family   : var(--font-fam2);
        color         : var(--primary);
        margin-bottom : 10px;
    }

    p {
        font-size      : 24px;
        font-family    : var(--font-fam2);
        letter-spacing : -1px;
    }

    @media(max-width:1200px) {
        img {
            transform : none;
        }
    }

    @media(max-width:992px) {
        .__title {
            line-height : 80px;
            font-size   : 70px;
        }

        p {
            font-size : 20px;
        }
    }

    @media(max-width:767px) {
        img {
            position : relative;
            width    : 112%;
            left     : -8%;
            transform : none;
        }
        .__content {
            width   : 100%;
            padding : 0 20px;
        }
    }
`