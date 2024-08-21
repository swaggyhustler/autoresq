/* eslint-disable react/prop-types */
import React from "react";
import GlobalContext from "./GlobalContext"
const GlobalContextProvider=({children})=>{
    const [loginData, setLoginData]=React.useState({email: '', password: ''});
    const [registerData, setRegisterData]=React.useState({name: '', email: '', mobile: '', password: ''});
    return (
        <GlobalContext.Provider value={{loginData, registerData, setLoginData, setRegisterData}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;