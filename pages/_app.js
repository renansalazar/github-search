import { Provider } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import { useStore } from '../store'

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
