import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../component/layout";
import { UseLoginContext } from "../context/loginContext";
import styles from "../styles/Home.module.css";

export default function Home() {
	
	//  load context
	const loginContext = UseLoginContext();

	//
	const router = useRouter();
	
	//
	const [Error, setError] = useState(null);
    const [Loading, setLoading] = useState(true);
	const [IsLoggedIn, setIsLoggedIn] = useState(false);

	//
	useEffect(()=>{

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
			const {result, response, message} = await loginContext.getUserInformation(accessToken);
			
			//  when finish loading
			setLoading(false);

			//  nothing went wrong
			if (result && response?.Username) setIsLoggedIn(true);

			//  something went wrong
			if (result === false && message) setError(message);
		}

		//
		if(accessToken) getUserInfo();
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
	return (Loading) ? (
		<Layout>
			<div>Loading, please wait</div>
		</Layout>
	) :
	(IsLoggedIn === false)
	? (
		<Layout>
			<h1 className={styles.title}>Website A</h1>
			<div className={styles.grid}>
				<div className={styles.card} onClick={()=>generateUrl()}>
					<h2>Login into your account</h2>
					<p>Find in-depth information about Next.js features and API.</p>
				</div>
			</div>
			<div>{Error}</div>
		</Layout>
	)
	: (
		<Layout>
			<h1 className={styles.title}>Website A</h1>
			<div className={styles.grid}>
				<div className={styles.card} onClick={()=>goHome()}>
					<h2>Go home</h2>
					<p>Find in-depth information about Next.js features and API.</p>
				</div>
			</div>
			<div>{Error}</div>
		</Layout>
	);
}
