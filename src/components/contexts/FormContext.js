import React from "react";

export const FormContext = React.createContext()

const FormContextProvider = (props) => {
    const [openForm, setOpenForm] = React.useState(false)

    return (
        <FormContext.Provider value={{ openForm, setOpenForm }}>
            {props.children}
        </FormContext.Provider>
    )
}

export default FormContextProvider