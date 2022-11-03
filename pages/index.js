import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ContentLayout from "../component/contentLayout";
import Layout from "../component/layout";
import LoggedinScreen from "../component/LoggedinScreen";
import LoginScreen from "../component/LoginScreen";
import { UseLoginContext } from "../context/loginContext";
import styles from "../styles/Home.module.scss";

export default function Home() {
	
	//  load context
	const loginContext = UseLoginContext();

	//
	const router = useRouter();

	//
	const hasRan = useRef(false);

	//
	const [Error, setError] = useState(null);
    const [Loading, setLoading] = useState(true);
	const [IsLoggedIn, setIsLoggedIn] = useState(false);

	//
	useEffect(()=>{
        if(hasRan.current === false)
        {
			//  load access token from local storage
			const accessToken = loginContext.getAccessToken();

			//
			if (!accessToken) {
				setLoading(false);
				setIsLoggedIn(false);
				return;
			}

			//  get user info
			const getUserInfo = async () => {

				//  get user info by using access tojen
				const {result, response, message, exception} = await loginContext.getUserInformation(accessToken);
				
				//  when finish loading
				setLoading(false);

				//  nothing went wrong
				if (result && response?.Username) setIsLoggedIn(true);

				//  something went wrong
				if (result === false && message) {
					if(exception === "UserLoggedOutException") {
						loginContext.removeAccessToken();
					}
					setError(message);
				}
			}

			//
			if(accessToken) getUserInfo();

		}

		return () => {
			hasRan.current = true
		}
	}, [])

	//
	async function generateUrl () {
		//	generate login url
		const {result, response, message} = await loginContext.generateLoginUrl();
	
		//	
		if (!result){ 
			setError(message);
			return;
		}
			
		//
		if (!response?.url) {
			setError("Unable to resolve the request, please try again later");
			return;
		}
		
		//
		window.location.href = response.url;
	}

	//
	const goHome = () => router.push('/home');

	//
	const loginScreen = <LoginScreen generateUrl={generateUrl} Error={Error}/>
	const loggedInScreen = <LoggedinScreen goHome={goHome} Error={Error}/>

	//
	return (Loading) ? (
		<Layout>
			<div>Loading, please wait</div>
		</Layout>
	) :
	(IsLoggedIn === false)
	? <Layout>{loginScreen}</Layout>
	: <Layout>{loggedInScreen}</Layout>;
}