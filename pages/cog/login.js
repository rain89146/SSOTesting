import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { useLoginContext } from '../../context/loginContext';

/**
 * Exchange token with code
 * @param {*} code 
 * @param {*} successCallback 
 * @param {*} failCallback 
 */
async function exchangeToken (code, successCallback, failCallback) 
{
	//	exchange token with code
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

	//	fecting token
	const {result, response, message, exception} = await fetchPromise().then(res=>res.json()).catch(error=>{ return error });

	//
	(result && response)
	? successCallback(response)
	: failCallback(message);
}

export default function login() {

    //
    const router = useRouter();

	//
	const loginContext = useLoginContext();

	//	
	const [Message, setMessage] = useState("Redirecting, please wait");

    //
    useEffect(() => {

		//
		if(!router.isReady) return;

		//  parse from query
		const {code, token, state} = router.query;

		//	get token from storage
		const accessToken = loginContext.storage.readStorage('accessToken');

		//	if it's logged in
		if (accessToken) {
			router.push('/home');
			return;
		}

		//	has code
		if(code) {
			exchangeToken (code, (res) => {

				//	update the reducer
				for(let i in res) {
					loginContext.setState(i, res[i]);
				}

				//	redirect to home
				router.push('/home');
			}, error => {

				//	render error
				setMessage(error)
			});
		}

		//	has token
		if (token) {
			loginContext.storage.createStorage('accessToken', token);
			router.push('/home');
		}
			
    }, [router.query])
    

    return (
        <div>{Message}</div>
    )
}
