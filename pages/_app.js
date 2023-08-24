import Layout from '../Components/Layout/Layout'
import '../styles/Global.css'

function MyApp({ Component, pageProps }) {
  
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
