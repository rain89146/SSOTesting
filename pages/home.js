import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import Layout from '../component/layout';
import { UseLoginContext } from '../context/loginContext';

export default function Home() {

    //
    const router = useRouter();

    //  load context
	const loginContext = UseLoginContext();

    //  declear
    const [UserName, setUserName] = useState("");
    const [Error, setError] = useState("");
    const [Loading, setLoading] = useState(true);

    //  load user info when on load
    useEffect(() => {
        
        //  load access token from local storage
        const accessToken = loginContext.getAccessToken();

        //
        if (!accessToken) {
            setLoading(false);
            setError("No session was found.");
            return;
        }

        //  get user info
        const getUserInfo = async () => {

            //  get user info by using access tojen
            const {result, response, message} = await loginContext.getUserInformation(accessToken);
            
            //  when finish loading
            setLoading(false);

            //  nothing went wrong
            if (result && response?.Username) setUserName(response.Username);

            //  something went wrong
            if (result === false && message) setError(message);
        }

        //
        if(accessToken) getUserInfo();

    }, []);

    //  user signout
    const signout = async () => {

        //
        setLoading(true);
        
        //  load access token from local storage
        const accessToken = loginContext.getAccessToken();

        //  
        const {result, response, message} = await loginContext.logOut(accessToken);

        //
        setLoading(false);

        //
        if(result === true && response?.isLoggedOut === true) {
            loginContext.removeAccessToken();
            router.push('/');
        }

        //  something went wrong
        if (result === false && message) setError(message);
    }

    //
    const goHome = () => router.push('/');

    //
    const context = (Loading) ? (<LoadingScreen/>) : (Error) ? <ErrorScreen error={Error} goHome={goHome}/> : <UserLoggedInScreen UserName={UserName} signout={signout} goHome={goHome}/>;

    //
    return <Layout>{context}</Layout>
}

//  user logged in screen
function UserLoggedInScreen({UserName, signout, goHome}) {
    return (UserName) ? (
        <div>
            <div>welcome home, user: {UserName}</div>
            <div>
                <button onClick={()=>signout()}>sign out</button>
            </div>
        </div>
    ) :
    (
        <div>
            <div>Something went wrong, please login again.</div>
            <div>
                <button onClick={()=>goHome()}>Login again</button>
            </div>
        </div>
    )
}

//  error screen
function ErrorScreen({error, goHome}) {
    return (
        <div>
            <div>{error}</div>
            <div>
                <button onClick={()=>goHome()}>Login again</button>
            </div>
        </div>
    )
}

//  loading screen
function LoadingScreen() {
    return (
        <div>
            We are processing your request, please wait
        </div>
    )
}