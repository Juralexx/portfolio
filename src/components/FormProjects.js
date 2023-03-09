import React from 'react';
import Cookies from 'js-cookie';
import bcrypt from 'bcryptjs'
import styled from 'styled-components'
import Icon from './tools/icons/Icon';
import { DynamicInput } from './tools/global/Inputs'
import CircleLoader from './tools/global/CircleLoader';
import { FormContext } from './contexts/FormContext';
import { ErrorCard } from './tools/global/ErrorCard';
import { addClass } from 'Utils';

const FormProjects = ({ projects, onValidation }) => {
    const pass = process.env.GATSBY_ENTERPRISE_PROJECTS_PASSWORD

    const isAuthorization = React.useMemo(() => {
        if (Cookies.get('_pro-auth'))
            return bcrypt.compareSync(pass, Cookies.get('_pro-auth'))
        else return false
    }, [pass])

    const [isPermission, setPermission] = React.useState(isAuthorization)
    const [password, setPassword] = React.useState({ value: '', err: false, success: false })

    const { setOpenForm } = React.useContext(FormContext)

    /**
     * 
     */

    const encrypt = value => {
        return bcrypt.hashSync(value, bcrypt.genSaltSync())
    }

    React.useEffect(() => {
        if (projects.type === 'company') {
            if (isAuthorization) {
                onValidation()
            } else {
                if (password.value === pass) {
                    Cookies.set('_pro-auth', encrypt(pass), { expires: 7 })
                    setPassword(prev => ({ ...prev, err: false, success: true }))
                    const timeout = setInterval(() => {
                        onValidation()
                        setPermission(true)
                    }, 3000)
                    return () => clearInterval(timeout)
                } else return
            }
        }
    }, [projects.type, password.value, onValidation, isAuthorization, pass])

    /**
     * 
     */

    const checkPassword = () => {
        if (password.value.length + 1 >= pass.length && password.value !== pass)
            setPassword(prev => ({ ...prev, err: true }))
        else setPassword(prev => ({ ...prev, err: false }))
    }

    /**
     * 
     */

    return (
        !isPermission && (
            <AuthorizationForm>
                <Icon
                    name="Lock"
                    className={`lock ${addClass(password.err, 'err')} ${addClass(password.success, 'success')}`}
                />
                <h3>
                    Pour voir les projets d'entreprise, veuillez saisir le mot de passe
                </h3>
                {password.success &&
                    <CircleLoader className='__loader' />
                }
                <DynamicInput
                    className={`${addClass(password.err, 'err')} ${addClass(password.success, 'success')}`}
                    type="text"
                    name="password"
                    id="password"
                    text="Mot de passe"
                    placeholder="Mot de passe"
                    defaultValue={password.value}
                    onChange={e => setPassword(prev => ({ ...prev, value: e.target.value }))}
                    onInput={checkPassword}
                />
                <ErrorCard
                    text="Mot de passe invalide"
                    display={password.err}
                    clean={() => setPassword(prev => ({ ...prev, err: false }))}
                />
                <p>
                    Pour obtenir le mot de passe, contactez-moi via <button onClick={() => setOpenForm(true)}>le formulaire de contact</button>.
                </p>
            </AuthorizationForm>
        )
    )
}

export default FormProjects

/**
 * 
 */

const AuthorizationForm = styled.div`
    padding       : 50px 30px;
    max-width     : 430px;
    margin        : 30px auto 0;
    background    : var(--content);
    border-radius : var(--rounded-md);
    box-shadow    : var(--shadow-relief), var(--shadow-smooth);
    border        : 1px solid var(--light-border);

    h3 {
        text-align : center;
        max-width  : 350px;
        margin     : 0 auto 10px;
    }

    .lock {
        display       : block;
        width         : 60px;
        height        : 60px;
        padding       : 10px;
        color         : var(--primary);
        border-radius : var(--rounded-md);
        background    : rgba(var(--primary-rgb), 0.2);
        margin        : 0 auto 20px;

        &.err {
            color      : var(--danger);
            background : rgba(var(--danger-rgb), 0.2);
        }
        &.success {
            color      : var(--success);
            background : rgba(var(--success-rgb), 0.2);
        }
    }

    .__loader {
        padding    : 0;
        background : none;
        margin-top : 20px;
    }

    .dynamic-input {
        margin-top : 20px;
        font-size  : 16px;
        
    }
    input {
        border-bottom : 2px solid var(--primary);
    }

    a,
    button {
        color       : var(--primary);
        font-family : var(--font-fam2);
        margin      : 0 2px;
    }
    p {
        margin-top : 20px;
        text-align : center;
        font-size  : 14px;
    }
`