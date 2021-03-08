import Login from './Login';
import {getWordStore} from 'src/constants/getNewWords';
import Layout from 'src/containers/layout'
import Register from './Register';



export default function Home(props) {
   return (
  <Layout title="SignIn">
       <Login/>
  </Layout>
  )
}
