import React, { createContext, useContext } from 'react'
import loginReducer from '../reducer/loginReducer';
import UseStorage from '../hook/UseStorage';

//
const LgoinContext = createContext();

//
const LoginContextProvider = props => {

    //  initiate reducer
	const reducer = new loginReducer();
	const [loginState, dispatch] = reducer.useLoginReducer;

    //  initiate local storage
    const storage = new UseStorage()

    //  dispatch state
    const setState = (name, value) => {
        if(name === "accessToken") {
            storage.createStorage('accessToken', value);
        }
        dispatch({stateName: name, payload: value})
    }
    
    //  store access token
    const storeAccessToken = (token, expiresIn) => {
        storage.createStorage('accessToken', token);
        console.warn(expiresIn)
        storage.createCookie('accessToken', token, expiresIn);
    }

    //  read access token
    const getAccessToken = () => {
        return storage.readCookie('accessToken');
    }

    //
    const removeAccessToken = () => {
        storage.clearCookie('accessToken');
    }

    //  generate login url
    const generateLoginUrl = async () => {
        const fetchPromise = () => new Promise((resolve, reject) => {
            fetch('http://localhost:3000/api/v1/veronica/generateloginurl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${process.env.NEXT_PUBLIC_AUTH_ID}:${process.env.NEXT_PUBLIC_AUTH_SECRET}`
                },
                body: JSON.stringify({
                    uriName: "coglogin",
                    responseType: "code",
                    state: ""
                })
            }).then(res => {
                if(!res.ok) {
                    reject({
                        result: false,
                        message: res.statusText
                    });
                }
                resolve(res);
            }).catch(error=>{ reject(error) })
        });

        return await fetchPromise().then(res=>res.json()).then(res => { return res }).catch(error=>{ return error });
    }

    //  get user information by access token
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

    //	exchange token with code
    const exchangeToken = async (code) => {
        const fetchPromise = () => new Promise((resolve, reject) => {
            fetch(`http://localhost:3000/api/v1/veronica/tokenexchange`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${process.env.NEXT_PUBLIC_AUTH_ID}:${process.env.NEXT_PUBLIC_AUTH_SECRET}`
                },
                body: JSON.stringify({
                    code: code
                })
            }).then(res => resolve(res)).catch(error=>{ reject(error) })
        });
        return await fetchPromise().then(res=>res.json()).catch(error=>{ return error });
    }

    //  log out
    const logOut = async (token) => {
        const fetchPromise = () => new Promise((resolve, reject) => {
            fetch(`http://localhost:3000/api/v1/server/logout`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accessToken: token
                })
            }).then(res => resolve(res)).catch(error=>{ reject(error) })
        });
        return await fetchPromise().then(res=>res.json()).catch(error=>{ return error });
    }

    //
    return (
        <LgoinContext.Provider value={{
            loginState,
            storage,
            logOut,
            setState,
            exchangeToken,
            getAccessToken,
            removeAccessToken,
            storeAccessToken,
            generateLoginUrl,
            getUserInformation,
        }}>{props.children}</LgoinContext.Provider>
    )
}

const UseLoginContext = () => {
    return useContext(LgoinContext);
}

export {LgoinContext, LoginContextProvider, UseLoginContext};
