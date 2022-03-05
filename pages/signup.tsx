import Head from "next/head";
import Signup from "../components/Signup";
import { getToken } from "../helpers/sessions";


function Index() {
  console.log('token >>> ' + getToken());

  return <div>
    <Head>
      <title>Login</title>
    </Head>
    <Signup />
  </div>;
}

export default Index;
