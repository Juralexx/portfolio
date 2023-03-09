import React from 'react';
import styled from 'styled-components';
import Globe from '../tools/Globe';
import Form from 'components/Form';
import RubberTitle from 'components/tools/RubberTitle';
import { useMultipleReveal } from 'components/hooks/useAnimation';
import StarrySky from 'components/tools/StarrySky';

const Contact = () => {
    useMultipleReveal(['.numbered-title', '.title', '.content p'])

    return (
        <ContactContainer id="contact">
            <div className='contact__inner' data-name="Contact">
                <div className="content">
                    <p className='up__title'>Contact</p>
                    <RubberTitle
                        title="Et après ?"
                        className='section__title'
                        HTMLElement='h2'
                    />
                    <p>
                        Ma boîte de réception est toujours ouverte à de nouvelles opportunités.
                        Que vous ayez une question ou que vous souhaitiez simplement dire bonjour, je ferai de mon mieux pour vous répondre !
                    </p>
                    <Form />
                </div>
            </div>
            <StarrySky />
            <Globe />
        </ContactContainer>
    )
}

export default Contact

const ContactContainer = styled.div`
    position : relative;
    width    : 100%;
    margin   : 0 auto;
    overflow : hidden;

    &:after {
        content    : '';
        position   : absolute;
        width      : 100%;
        height     : 100%;
        top        : 0;
        right      : 0;
        background : linear-gradient(to bottom, var(--body) 10%, rgba(var(--body-rgb), 0) 100%);
        z-index    : -2;
    }

    &:before {
        content    : '';
        position   : absolute;
        width      : 100%;
        height     : 100%;
        bottom     : 0;
        left       : 0;
        background : linear-gradient(to right, var(--body) 30%, rgba(var(--body-rgb), 0) 70%);
        z-index    : -2;
    }

    .contact__inner {
        position : relative;
        width    : 100%;
        height   : 100%;
        padding  : 200px 100px;
        overflow : hidden;

        @media (max-width: 992px) {
            padding : 200px 50px;
        }
        @media (max-width: 768px) {
            padding : 200px 15px;
        }
    }

    .content {
        width     : 100%;
        max-width : 992px;

        p {
            line-height : 30px;
        }

        @media (max-width: 768px) {
            margin : 0 auto 50px;
        }

        .email-link {
            margin-top : 50px;
        }
    }
`;