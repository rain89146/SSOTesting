import { useEffect, useState } from 'react'
import { useLoginContext } from '../context/loginContext';

export default function home() {

    //  load context
	const loginContext = useLoginContext();

    //  declear
    const [UserName, setUserName] = useState("");
    const [Error, setError] = useState("");

    //  load user info when on load
    useEffect(() => {
        
        //  load access token from local storage
        const accessToken = loginContext.storage.readStorage('accessToken');

        //
        const getUserInfo = async () => {

            //  get user info by using access tojen
            const {result, response, message} = await loginContext.getUserInformation(accessToken);
            
            //  nothing went wrong
            if (result && response?.Username) setUserName(response.Username);

            //  something went wrong
            if (result === false && message) setError(message);
        }

        //
        getUserInfo();

    }, [])
    
    //  render
    return (Error) ? (<div>{Error}</div>) : (<div>welcome home, user: {UserName}</div>)
}
