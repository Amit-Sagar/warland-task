import { AuthContextProvider } from '@/context/AuthContext'
import '@/styles/globals.scss'

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}
