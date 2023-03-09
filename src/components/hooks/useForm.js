import React from 'react';
import axios from 'axios';
import { isEmailValid, isPhoneValid, containsAnyLetters, onlyLettersSpacesAndDashes } from 'Utils';

const useForm = () => {
    const [isLoading, setLoading] = React.useState(false)
    const [err, setErr] = React.useState([])
    const [submitted, setSubmitted] = React.useState(false)
    const [form, setForm] = React.useState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })

    const handleServerResponse = (ok) => {
        if (ok) {
            setForm({ name: '', lastname: '', email: '', phone: '', subject: '', message: '' })
            if (err.includes('server')) {
                setErr(prev => prev.filter(e => e !== 'server'))
            }
            setLoading(true)
            const timeout = setTimeout(() => {
                setLoading(false)
                setSubmitted(true)
            }, 2000)
            return () => clearTimeout(timeout)
        } else setSubmitted(false)
    }

    /**
     * Check inputs values validity while typing
     */

    React.useEffect(() => {
        if (form.lastname !== '' && !onlyLettersSpacesAndDashes(form.lastname)) {
            if (!err.includes('lastname'))
                setErr(prev => [...prev, 'lastname'])
        } else {
            if (err.includes('lastname'))
                setErr(prev => prev.filter(e => e !== 'lastname'))
        }
        if (form.name !== '' && !onlyLettersSpacesAndDashes(form.name)) {
            if (!err.includes('name'))
                setErr(prev => [...prev, 'name'])
        } else {
            if (err.includes('name'))
                setErr(prev => prev.filter(e => e !== 'name'))
        }
        if (form.phone !== '' && ((form.phone.trim().length >= 10 && !isPhoneValid(form.phone)) || containsAnyLetters(form.phone))) {
            if (!err.includes('phone'))
                setErr(prev => [...prev, 'phone'])
        } else {
            if (err.includes('phone'))
                setErr(prev => prev.filter(e => e !== 'phone'))
        }
    }, [form, err])

    /**
     * Submission function
     */

    const submit = (e) => {
        e.preventDefault()

        if (form.lastname === '' || form.lastname.trim().length < 2 || !onlyLettersSpacesAndDashes(form.lastname)) {
            setErr(prev => [...prev, 'lastname'])
        } else {
            if (err.includes('lastname')) {
                setErr(prev => prev.filter(e => e !== 'lastname'))
            }
            if (form.name === '' || form.name.trim().length < 2 || !onlyLettersSpacesAndDashes(form.name)) {
                setErr(prev => [...prev, 'name'])
            } else {
                if (err.includes('name')) {
                    setErr(prev => prev.filter(e => e !== 'name'))
                }
                if (form.email === '' || !isEmailValid(form.email)) {
                    setErr(prev => [...prev, 'email'])
                } else {
                    if (err.includes('email')) {
                        setErr(prev => prev.filter(e => e !== 'email'))
                    }
                    if (form.phone !== '' && !isPhoneValid(form.phone)) {
                        setErr(prev => [...prev, 'phone'])
                    } else {
                        if (err.includes('phone')) {
                            setErr(prev => prev.filter(e => e !== 'phone'))
                        }
                        if (form.subject === '' || form.subject.trim().length < 3) {
                            setErr(prev => [...prev, 'subject'])
                        } else {
                            if (err.includes('subject')) {
                                setErr(prev => prev.filter(e => e !== 'subject'))
                            }
                            if (form.message === '' || form.message.trim().length < 10) {
                                setErr(prev => [...prev, 'message'])
                            } else {
                                if (err.includes('message')) {
                                    setErr(prev => prev.filter(e => e !== 'message'))
                                }
                                else {
                                    axios({
                                        method: 'POST',
                                        url: `https://formspree.io/${process.env.GATSBY_FORM_ID}`,
                                        data: form,
                                    })
                                        .then(() => handleServerResponse(true))
                                        .catch(() => handleServerResponse(false))
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return { form, setForm, isLoading, err, setErr, submitted, setSubmitted, submit }
}

export default useForm