import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { UseLoginContext } from '../../context/loginContext';
import style from './style.module.scss';

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
		const {code, token, state} = router.query;

		//	get token from storage
		const accessToken = loginContext.storage.readStorage('accessToken');

		//	default redirect
		let reidrectTo = '/home';

		//	if state is decleared, do some state handling here
		if (state) {
			reidrectTo += `?state=${state}`
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

		//	get access token via Token option
		if (token) {
			loginContext.storage.createStorage('accessToken', token);
			router.push(reidrectTo);
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

	const waitingMessage = (
		<div className={style.waitingMessage}>
			<div>{message}</div>
		</div>
	);

	const errorMessage = (
		<div className={style.errorMessage}>
			<div>{message}</div>
		</div>
	)

	//
	return (status) ? waitingMessage : errorMessage;
}