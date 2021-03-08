import Head from "next/head";
import Nav from 'src/components/Nav'


const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title> {title} </title>
      </Head>

      <Nav title={title}/>

      {children}
    </>
  );
};

export default Layout;