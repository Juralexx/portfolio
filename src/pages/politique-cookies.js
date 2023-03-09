import React from 'react'
import styled from 'styled-components'
import Root from 'Root'
import Head from 'Head'
import Main from 'components/Main'
import Breadcrumbs from 'components/tools/Breadcrumb'
import { OutlinedLinkButton } from 'components/tools/global/Buttons/OutlinedButton'
import { useSiteDatas } from 'components/data/site'

const PolitiqueCookies = ({ location }) => {
    const title = "Politique de cookies"
    const datas = useSiteDatas()

    return (
        <Root location={location}>
            <Head title={title} description={title} />
            <Main>
                <Mentions className="container-md">
                    <h1>{title}</h1>
                    <Breadcrumbs denomination={datas.author} description={title} />

                    <p>Cette politique s’applique aux site {datas.domain} (ci-après le « site »).
                        Pour donner ou retirer votre consentement concernant la pose de cookies sur le site {datas.domain}, cliquez sur le bouton ci-dessous&nbsp;:</p>

                    <OutlinedLinkButton to="#cookies-manager">
                        Gérer mes cookies
                    </OutlinedLinkButton>

                    <div id="cookie-description">
                        <h2>Qu'est-ce qu'un cookie ?</h2>

                        <p>Un cookie est un petit fichier texte et recouvre tout type de traceurs « déposés et lus par exemple lors de la consultation
                            d'un site internet, de la lecture d'un courrier électronique, de l'installation ou de l'utilisation d'un logiciel ou d'une
                            application mobile et ce, quel que soit le type de terminal utilisé ». Il peut être déposé par le serveur du site visité ou
                            par un serveur tiers (régie publicitaire, service de web analytique, etc.). Les cookies ne compromettent pas la sécurité du site.</p>
                    </div>

                    <div id="cookies">
                        <h2>Les cookies déposés par {datas.domain}</h2>

                        <p>Lorsque vous vous connectez sur notre site, nous sommes susceptibles d’installer divers cookies sur votre terminal.<br />
                            Les cookies que nous émettons nous permettent&nbsp;:</p>

                        <ul className='list__styled'>
                            <li>De maintenir le bon fonctionnement du site</li>
                            <li>D’enregistrer et adapter les fonctionnalités du site en fonction de vos préférences de navigation (identification, s’adapter aux types d’appareils utilisés)</li>
                            <li>De gérer l’acceptation et la durée de conservation des cookies</li>
                        </ul>

                        <p>Conformément à la réglementation, les cookies ont une durée de vie maximum de 13 mois.</p>
                    </div>

                    <div id="cookies-tiers">
                        <h2>Les cookies émis par l’intermédiaire de tiers</h2>

                        <ul className='list__styled'>
                            <li><strong>Les cookies analytics&nbsp;:</strong></li>
                        </ul>

                        <p className='mb-5'>Ils nous permettent de suivre les audiences de notre site et de connaître votre navigation sur notre site (cookies Google Analytics) et
                            de générer des données statistiques quant aux utilisations du site. Cela nous permet d’améliorer la performance du site.</p>

                        <ul className='list__styled'>
                            <li><strong>Les cookies des réseaux sociaux&nbsp;:</strong></li>
                        </ul>

                        <p className='mb-5'>En naviguant sur notre site, vous avez la possibilité de cliquer sur les boutons « réseaux sociaux » afin de consulter nos profils
                            Facebook, Twitter. Ces applications tierces sont susceptibles de déposer des cookies pour vous proposer de la publicité ciblée.
                            En cliquant sur l’icône correspondante au réseau social, ce dernier est susceptible de vous identifier. Si vous êtes connectés
                            au réseau social lors de votre navigation sur notre site, les boutons de partage permettent de relier les contenus consultés
                            à votre compte utilisateur.</p>

                        <p>Nous ne pouvons contrôler le processus employé par les réseaux sociaux pour collecter les informations relatives à votre navigation
                            sur notre site. Nous vous invitons donc à consulter leur politique de protection des données à caractère personnel afin de
                            connaître leur finalité d’utilisation ainsi que les informations de navigation qu’ils peuvent recueillir.</p>
                    </div>

                    <div id="gestion-cookies">
                        <h2>La gestion des cookies</h2>

                        <p>Lorsque vous visitez notre site pour la première fois, une bandeau cookies s’affiche vous proposant de consentir ou refuser
                            à la pose de ces cookies.</p>
                        <br />

                        <p>Vous pouvez à tout moment modifier votre choix en cliquant sur le lien Gestion des cookies en bas de chaque page ou en cliquant
                            directement sur le lien suivant&nbsp;: <a href='#footer'>«&nbsp;<strong>Gérer&nbsp;mes&nbsp;cookies</strong>&nbsp;»</a>.</p>
                    </div>

                    <div id="blocage-cookies">
                        <h2>Blocage des Cookies</h2>

                        <p>Dans tous les cas, l’Internaute a le contrôle de ces cookies, puisqu’ils sont stockés sur son ordinateur, et a la possibilité
                            de les lire, de les filtrer, de les refuser et de les détruire.</p>

                        <h4>Comment détruire les fichiers « cookies » déjà installés sur votre ordinateur ?</h4>

                        <ul className='list__styled'>
                            <li>Allez sur votre poste de travail</li>
                            <li>Sélectionnez dans C:\ le dossier Windows</li>
                            <li>Ouvrez le dossier « Temporary Internet Files »</li>
                            <li>Sélectionnez tous les fichiers (CTRL A)</li>
                            <li>Choisissez l’option « supprimer »</li>
                        </ul>

                        <h4>Comment refuser ou être averti de l’installation de tous les fichiers « cookies » ?</h4>

                        <p>Navigation avec Internet Explorer 5&nbsp;:</p>

                        <ul className='list__styled'>
                            <li>Choisir « Outils »</li>
                            <li>« Options Internet »</li>
                            <li>« Sécurité »</li>
                            <li>« Personnaliser le niveau »</li>
                            <li>Dans le menu déroulant allez à « cookies »</li>
                            <li>Rubrique « autoriser les cookies sur votre ordinateur »</li>
                            <li>Choisir « demander » pour être avertis ou « désactiver » pour refuser tous les « cookies »</li>
                        </ul>

                        <p>Navigation avec Internet Explorer 6, 7 ou 8&nbsp;:</p>

                        <ul className='list__styled'>
                            <li>Choisir « Outils »</li>
                            <li>« Options Internet »</li>
                            <li>« Confidentialité »</li>
                            <li>Puis le niveau que vous souhaitez appliquer</li>
                        </ul>

                        <p>Navigation avec Firefox&nbsp;:</p>

                        <ul className='list__styled'>
                            <li>Choisir « Outils »</li>
                            <li>« Options »</li>
                            <li>Dans « Vie privée » décocher « Accepter les cookies »</li>
                        </ul>

                        <p>Navigation avec Google Chrome&nbsp;:</p>

                        <ul className='list__styled'>
                            <li>Cliquer sur « Personnaliser et contrôler Google Chrome »</li>
                            <li>Choisir « Paramètres »</li>
                            <li>Dans « Confidentialité » cliquer sur « Paramètres de contenu » et cocher « Bloquer les cookies et les données de site tiers »</li>
                        </ul>
                    </div>
                </Mentions>
            </Main>
        </Root>
    )
}

export default PolitiqueCookies

const Mentions = styled.main`

    &:before {
        content    : '';
        position   : absolute;
        width      : 40%;
        height     : 100%;
        bottom     : 0;
        right      : 0;
        background : linear-gradient(to left,var(--body) 30%,rgba(var(--body-rgb),0) 100%);
        z-index    : -1;
    }

    &:after {
        content    : '';
        position   : absolute;
        width      : 100%;
        height     : 70%;
        top        : 0;
        right      : 0;
        padding    : 50px 40px;
        background : linear-gradient(to bottom,rgba(var(--body-rgb),1) 20%,rgba(var(--body-rgb),0) 100%);
        z-index    : -1;
    }

    h1, h2, h2 {
        font-family : var(--font-fam1);
    }

    h1 {
        margin-bottom : 10px;
    }

    h2 {
        margin      : 40px 0 15px;
        font-size   : 22px;
        font-weight : 500;
        color       : var(--primary);
        font-family : var(--font-fam2);
    }

    h4 {
        margin      : 28px 0 20px;
        font-weight : 400;
    }

    .breadcrumb {
        justify-content : flex-start;
        margin-bottom   : 40px;
    }

    a {
        color : var(--primary);
    }

    p {
        text-align  : justify;
        line-height : 26px;
        font-size   : 16px;
    }

    ul {
        text-align   : justify;
        padding-left : 28px;
        margin       : 20px 0;
        line-height  : 26px;

        &.list__styled {
            color      : var(--text);
            list-style : unset;
            li {
                list-style : unset;
            }
        }
    }

    button {
        margin : 20px auto;
    }

    #informations-légales {
        p {
            text-align : left;
        }
    }
`