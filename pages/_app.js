import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import fetch from 'service/fetchJson';
import { SWRConfig } from 'swr'



function MyApp({ Component, pageProps }) {

  return (
    <SWRConfig
    value={{
      fetcher: fetch,
      onError: (err) => {
        console.error(err)
      },
    }}
  >
  <Component {...pageProps} />
  </SWRConfig>
  )
}

export default MyApp
