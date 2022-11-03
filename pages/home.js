import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react'
import Layout from '../component/layout';
import { UseLoginContext } from '../context/loginContext';
import ContentLayout from '../component/contentLayout';
import styles from "../styles/Home.module.scss";

export default function Home() {

    //
    const router = useRouter();

    //  load context
	const loginContext = UseLoginContext();

    //
    const hasRan = useRef(false);

    //  declear
    const [UserName, setUserName] = useState("");
    const [Error, setError] = useState("");
    const [Loading, setLoading] = useState(true);

    //  load user info when on load
    useEffect(() => {
        if(hasRan.current === false)
        {

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
                const {result, response, message, exception} = await loginContext.getUserInformation(accessToken);
                
                //  when finish loading
                setLoading(false);

                //  nothing went wrong
                if (result && response?.Username) setUserName(response.Username);

                //  something went wrong
                if (result === false && message) {

                    if(exception === "UserLoggedOutException") {
                        loginContext.removeAccessToken();
                    }

                    setError(message)
                };
            }

            //
            if(accessToken) getUserInfo();

        }

        return () => {
            hasRan.current = true
        }
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
        <HomeScreem UserName={UserName} signout={signout}/>
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

function HomeScreem({
    UserName,
    signout
}){
    const background = (
        <div 
        data-aos="fade-in"
        style={{
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url('https://i.pinimg.com/originals/31/7c/6e/317c6e9b819948375c955788d7377449.jpg')`
        }}></div>
    )
    return (
        <ContentLayout background={background}>
            <div>
                <h1 className={styles.title}>Hello, K/DA</h1>
                <div className={styles.grid}>
                    <div className={styles.card} onClick={()=>signout()}>
                        <h2>Sign Out</h2>
                    </div>
                </div>
            </div>
        </ContentLayout>
    )
}

//  error screen
function ErrorScreen({error, goHome}) {
    
    const background = (
        <div 
        data-aos="fade-in"
        style={{
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url('https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Fblogoflegends.com%2Ffiles%2F2020%2F10%2FKaisa-Final-HD-image.jpg')`
        }}></div>
    )
    return (
        <ContentLayout background={background}>
            <div>
                <div>{error}</div>
                <div>
                    <button onClick={()=>goHome()}>Login again</button>
                </div>
            </div>
        </ContentLayout>
    )
}

//  loading screen
function LoadingScreen() {
    const background = (
        <div 
        data-aos="fade-in"
        style={{
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url('https://i.pinimg.com/originals/31/7c/6e/317c6e9b819948375c955788d7377449.jpg')`
        }}></div>
    )
    return (
        <ContentLayout background={background}>
            <div>
                <h1 className={styles.title}>Loading</h1>
            </div>
        </ContentLayout>
    )
}