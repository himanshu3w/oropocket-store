import React from "react";
import { Helmet } from "react-helmet";
import Routers from "../routes";
import Web3 from "web3";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const web3 = new Web3(
    "https://mainnet.infura.io/v3/681332a2c23a4ce8ac972bfbdfa75555"
  );
  console.log(web3);
  return (
    <>
      <Helmet>
        <title>Crypto Faucets - For Web3 Developers</title>
        {/* google font family link */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>
      <Routers />
      <ToastContainer />
    </>
  );
};

export default App;
