import { useEffect, useState } from 'react'
import { UseLoginContext } from '../context/loginContext';

export default function Home() {

    //  load context
	const loginContext = UseLoginContext();

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
        if(accessToken) getUserInfo();

    }, []);

    //
    const signout = () => {
        console.log('signing out')
    }
    
    //  render
    return (Error) ? (<div>{Error}</div>) : (UserName) ? 
    (
        <div>
            <div>welcome home, user: {UserName}</div>
            <div>
                <button onClick={()=>signout()}>sign out</button>
            </div>
        </div>
    ) : 
    (<div>Something went wrong, please login again.</div>)
}
