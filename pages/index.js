import Head from "next/head";
import { useState } from "react";
import Layout from "../component/layout";
import { UseLoginContext } from "../context/loginContext";
import styles from "../styles/Home.module.css";

export default function Home() {
	
	//  load context
	const loginContext = UseLoginContext();

	//
	const [Error, setError] = useState(null)

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
	return (
		<Layout>
			<h1 className={styles.title}>Website A</h1>
			<div className={styles.grid}>
				<div className={styles.card} onClick={()=>generateUrl()}>
					<h2>Generate Login Url</h2>
					<p>Find in-depth information about Next.js features and API.</p>
				</div>
			</div>
			<div>{Error}</div>
		</Layout>
	);
}
