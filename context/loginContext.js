import React, { createContext, useContext } from 'react'
import loginReducer from '../reducer/loginReducer';
import UseStorage from '../hook/UseStorage';
//
const LgoinContext = createContext();

//
const LoginContextProvider = props => {

    //
	const reducer = new loginReducer();
	const [loginState, dispatch] = reducer.useLoginReducer;

    //
    const storage = new UseStorage()

    //
    const setState = (name, value) => {
        if(name === "accessToken") {
            storage.createStorage('accessToken', value);
        }
        dispatch({stateName: name, payload: value})
    }

    //
    const getUserInformation = async (accessToken) => {
        const lgPromise = () => new Promise((resolve, reject) => {
            fetch(
                `http://localhost:3000/api/v1/veronica/getuser`, 
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        accessToken
                    })
                }
            ).then(res=>resolve(res)).catch(error=>reject(error))
        });
        return await lgPromise().then(res=>res.json()).catch(error=>{return error});
    }

    //
    return (
        <LgoinContext.Provider value={{
            loginState,
            storage,
            setState,
            getUserInformation
        }}>{props.children}</LgoinContext.Provider>
    )
}

const useLoginContext = () => {
    return useContext(LgoinContext);
}

export {LgoinContext, LoginContextProvider, useLoginContext};
