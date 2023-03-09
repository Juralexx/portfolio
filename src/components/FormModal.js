import React from 'react';
import styled from 'styled-components';
import Modal from './tools/global/Modal';
import Warning from './tools/global/Warning';
import Icon from './tools/icons/Icon';
import CircleLoader from './tools/global/CircleLoader';
import { DynamicInput, Textarea } from './tools/global/Inputs';
import { OutlinedButton } from 'components/tools/global/Buttons/OutlinedButton';
import { addClass } from 'Utils';
import { FormContext } from './contexts/FormContext';
import useForm from './hooks/useForm';
import { ErrorCard } from './tools/global/ErrorCard';

const FormModal = () => {
    const { form, setForm, isLoading, err, setErr, submitted, setSubmitted, submit } = useForm()
    const { openForm, setOpenForm } = React.useContext(FormContext)

    return (
        <Modal open={openForm} setOpen={setOpenForm} onClose={() => setSubmitted(false)}>
            {!submitted && !isLoading &&
                <>
                    <h2>Me contacter</h2>
                    <form onSubmit={submit}>
                        <InputsContainer>
                            <div className='input__container'>
                                <DynamicInput
                                    className={`${addClass(err.includes('lastname'), 'err')}`}
                                    type="text"
                                    text="Nom"
                                    placeholder="Nom"
                                    defaultValue={form.lastname}
                                    onChange={e => setForm(prev => ({ ...prev, lastname: e.target.value }))}
                                />
                                <ErrorCard
                                    text="Veuillez un nom valide"
                                    display={err.includes('lastname')}
                                />
                            </div>
                            <div className='input__container'>
                                <DynamicInput
                                    className={`${addClass(err.includes('name'), 'err')}`}
                                    type="text"
                                    text="Prénom"
                                    placeholder="Prénom"
                                    defaultValue={form.name}
                                    onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                                />
                                <ErrorCard
                                    text="Veuillez saisir un prénom valide"
                                    display={err.includes('name')}
                                />
                            </div>
                        </InputsContainer>
                        <InputsContainer>
                            <div className='input__container'>
                                <DynamicInput
                                    className={`${addClass(err.includes('email'), 'err')}`}
                                    type="text"
                                    text="Email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                                />
                                <ErrorCard
                                    text="Veuillez saisir un email valide"
                                    display={err.includes('email')}
                                />
                            </div>
                            <div className='input__container'>
                                <DynamicInput
                                    className={`${addClass(err.includes('phone'), 'err')}`}
                                    type="text"
                                    text="Téléphone"
                                    placeholder="Téléphone"
                                    value={form.phone}
                                    onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
                                />
                                <ErrorCard
                                    text="Numéro de téléphone invalide"
                                    display={err.includes('phone')}
                                />
                            </div>
                        </InputsContainer>
                        <InputsContainer>
                            <div className='input__container full'>
                                <DynamicInput
                                    className={`${addClass(err.includes('subject'), 'err')}`}
                                    type="text"
                                    text="Sujet"
                                    placeholder="Sujet"
                                    value={form.subject}
                                    onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))}
                                />
                                <ErrorCard
                                    text="Veuillez saisir le sujet de votre message"
                                    display={err.includes('subject')}
                                />
                            </div>
                        </InputsContainer>
                        <InputsContainer>
                            <div className='input__container full'>
                                <Textarea
                                    className={`textarea ${addClass(err.includes('message'), 'err')}`}
                                    type="text"
                                    text="Message"
                                    placeholder="Message"
                                    value={form.message}
                                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                                />
                                <ErrorCard
                                    text="Veuillez saisir votre message"
                                    display={err.includes('message')}
                                />
                            </div>
                        </InputsContainer>

                        <div className="btn__container">
                            <OutlinedButton type="submit">
                                Envoyer <Icon name="Arrow" />
                            </OutlinedButton>
                        </div>
                    </form>

                    {err.includes('server') &&
                        <Warning
                            open={err.includes('server')}
                            onClose={() => setErr(prev => prev.filter(e => e !== 'server'))}
                            title="Une erreur s'est produite..."
                            text="Une erreur s'est produite lors de la communication avec le serveur. Merci de réessayer plus tard."
                        />
                    }
                </>
            }
            {isLoading &&
                <Loader>
                    <CircleLoader />
                </Loader>
            }
            {submitted && !isLoading && err.length === 0 &&
                <SubmissionDone>
                    <div role="button"
                        tabIndex={0}
                        className='header'
                        onClick={() => setSubmitted(false)}
                        onKeyDown={() => setSubmitted(false)}
                    >
                        <Icon name="Arrow" /> Retour
                    </div>
                    <Icon name="CheckCircle" className='icon' />
                    <h3> Votre message a bien été envoyé.</h3>
                    <p>Je vous répondrai dans les meilleurs délais...</p>
                </SubmissionDone>
            }
        </Modal>
    )
}

export default FormModal

/**
 * 
 */

export const InputsContainer = styled.div`
    display         : flex;
    justify-content : space-between;
    margin-bottom   : 10px;

    .input__container {
        width : 49%;
        &.full {
            width : 100%;
        }

        .error-message {
            color   : var(--red);
            padding : 5px 0 0;
        }

        > label {
            display : none;
        }
    }

    .dynamic-input,
    .textarea {
        &:before {
            content : none;
        }
    }

    input {
        font-family : inherit;
        font-family : var(--font-fam2);
    }

    @media(max-width:576px) {
        flex-direction : column;
        margin-bottom  : 0;

        .input__container {
            width  : 90%;
            margin : 10px auto;
            &.full {
                width : 90%;
            }
            textarea {
                min-height : 150px;
            }
        }
    }
`;

/**
 * 
 */

export const SubmissionDone = styled.div`
    .header {
        display     : flex;
        align-items : center;
        font-size   : 16px;
        font-family : var(--font-fam2);
        color       : var(--primary);
        cursor      : pointer;

        svg {
            width            : 35px;
            height           : 35px;
            padding          : 7px;
            stroke           : var(--primary);
            transform        : rotate(-180deg);
            background-color : rgba(var(--primary-rgb), 0.08);
            border-radius    : var(--rounded-full);
            margin-right     : 10px;
            &:hover {
                background-color : rgba(var(--primary-rgb), 0.12);
            }
        }
    }

    .icon {
        display : block;
        margin  : 0 auto;
        width   : 60px;
        height  : 60px;
        color   : var(--primary);
    }

    h3 {
        font-size      : 20px;
        text-align     : center;
        padding-top    : 15px;
        letter-spacing : -1px;
        word-spacing   : -5px;
        font-family    : var(--font-fam2);
        color          : var(--primary);
    }
    p {
        text-align : center;
        padding     : 20px 0;
    }
`

export const Loader = styled.div`
    padding         : 50px 0;
    display         : flex;
    justify-content : center;
    
    svg {
        width  : 44px;
        height : 44px;
        circle {
            stroke : var(--primary) !important;
        }
        path {
            stroke : var(--primary) !important;
        }
    }
`