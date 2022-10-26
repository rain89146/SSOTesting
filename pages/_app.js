import { LoginContextProvider } from '../context/loginContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <LoginContextProvider>
      <Component {...pageProps} />
    </LoginContextProvider>
  )
}

export default MyApp
