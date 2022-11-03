import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { UseLoginContext } from '../../context/loginContext';
import style from './style.module.scss';
import Layout from '../../component/layout';
import ContentLayout from '../../component/contentLayout';
import styles from "../../styles/Home.module.scss";

export default function Login() {

    //
    const router = useRouter();

	//
	const loginContext = UseLoginContext();

	//	
	const [Message, setMessage] = useState("Redirecting, please wait");
	const [LoadingStatus, setLoadingStatus] = useState(true);

    //
    useEffect(() => {

		//
		if (!router.isReady) return;

		//  parse from query
		const {code, state} = router.query;

		//	get token from storage
		const accessToken = loginContext.getAccessToken();

		//	default redirect
		let reidrectTo = '/home';

		//	if state is decleared, do some state handling here
		if (state) {
			reidrectTo += `?state=${state}`;
		}

		//	if it's logged in
		if (accessToken) {
			router.push(reidrectTo);
			return;
		}

		//	get access token via Code option
		if(code) {

			const getToken = async () => {

				//
				const {result, response, message, exception} = await loginContext.exchangeToken(code);

				//
				if (result && response) {

					//	update the reducer
					for(let i in response) {
						loginContext.setState(i, response[i]);
					}

					//	
					loginContext.storeAccessToken(response.accessToken, new Date(response.exp));

					//	redirect to home
					router.push(reidrectTo);
				}
				else {

					//	render error
					setMessage(message);
					setLoadingStatus(false);
				}
			}
			getToken();
			return;
		}

		//	render error
		setMessage("Permission Denied");
		setLoadingStatus(false);
			
    }, [router.query])
    
	//
    return <LoginLoadingScreen message={Message} status={LoadingStatus} />
}

//	loading screen
function LoginLoadingScreen ({ message, status })
{

	const errorMessage = (
		<div className={style.errorMessage}>
			<div>{message}</div>
		</div>
	)

	//
	return <Layout>{(status) ? <WaitingMessage/> : errorMessage}</Layout>
}

function WaitingMessage () {
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