/* eslint-disable react/prop-types */
import React from "react";
import GlobalContext from "./GlobalContext"
const GlobalContextProvider=({children})=>{
    const [currentCoords, setCurrentCoords]=React.useState(null);
    const [list, setList]=React.useState(null);
    const [loginData, setLoginData]=React.useState({email: '', password: ''});
    const [registerData, setRegisterData]=React.useState({name: '', email: '', mobile: '', password: ''});
    const getCurrentCoords=()=>{
        return new Promise((resolve, reject)=>{
          navigator.geolocation.getCurrentPosition((position)=>{
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
            }, (error)=>{
            console.log("E: Error getting users current locaiton");
            reject(error);
          });
        });
    }
    React.useEffect(()=>{
        getCurrentCoords().then((res)=>{
            setCurrentCoords(res);
        });
    }, []);
    
    return (
        <GlobalContext.Provider value={{loginData, registerData, currentCoords, list, setLoginData, setRegisterData, setCurrentCoords, setList}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider;