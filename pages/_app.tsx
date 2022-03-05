import '../styles/globals.css'
// import 'semantic-ui-css/semantic.min.css'
import { redirectUser } from "../utils/redirect";
import axios from 'axios';
import { baseUrl } from '../utils/baseUrl';
import { getToken } from '../helpers/sessions';
import Layout from '../components/Layout/Layout';
import { Provider, useDispatch } from 'react-redux';
import { wrapper } from '../redux/store';
import { addMe } from '../redux/reducers/authSlice';

function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);