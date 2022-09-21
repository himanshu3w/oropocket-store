/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Footer from "../../components/Shared/Footer/Footer";
import Header from "../../components/Shared/Header/Header";
import Web3 from "web3";
import { storeFunction, retriveDetailsFunction } from "./web3functions";
const Home = () => {
  const [inputValue, setInputValue] = useState({
    inputValue: 0,
  });
  const [data, setData] = useState({
    total_sum: 0,
    total_number_of_wallets: 0,
  });
  const [wallet, setWallet] = useState("0x0EE1...C87C");

  // When User Will Change Wallet or Network This Will Get Executed
  useEffect(() => {
    const nextOne = async (e) => {
      if (typeof window.ethereum == "undefined") {
        alert("Please Enable Metamask");
        setWallet(`Please Enable Metamask`);
      } else {
        // Listening To Change of Chain in Metamask
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        // Listening To Change of Wallets in Metamask
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
          console.log();
        });
        //----------------------------------------------------
        let getAccount = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWallet(
          `Network: ${window.ethereum.networkVersion} Wallet : ${getAccount[0]}`
        );
      }
    };

    nextOne();
  }, [window.ethereum.networkVersion, wallet]);

  // This will be executed for the first Time To Retrive The Values If Network = Mumbai Matic
  useEffect(() => {
    // console.log(, "type111")

    if (typeof window.ethereum.networkVersion === "string") {
      const CallRetrieveFunctionOnce = async (e) => {
        let getData = await retriveDetailsFunction();
        setData({
          sum: getData.total_sum,
          wallet_num: getData.total_number_of_wallets,
        });
        console.log("getData", getData);
      };
      if (
        typeof window.ethereum != "undefined" &&
        window.ethereum.networkVersion === "80001"
      ) {
        CallRetrieveFunctionOnce();
      } else if (window.ethereum.networkVersion !== "80001") {
        console.log("ss", window.ethereum.networkVersion);
        alert("Please Select MUMBAI MATIC Network In Metamask");
      }
    }
  }, [window.ethereum.networkVersion]);
  // Handle Change For Input Field
  const handleChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
    console.log(inputValue);
  };
  // Handle Submit For Input Field
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("inputValue", inputValue);
    const tempFunction = async (e) => {
      let getstoreFunction = await storeFunction(inputValue.inputValue);
      setData({
        sum: getstoreFunction.retriveDetails.total_sum,
        wallet_num: getstoreFunction.retriveDetails.total_number_of_wallets,
      });
    };
    tempFunction();
  };

  return (
    <>
      <Header wallet={wallet} />
      <div className="home_wrapper">
        <div className="container">
          <div className="home_content">
            <div className="input_field">
              <form onSubmit={handleSubmit}>
                <label htmlFor="value">Enter value</label>
                <input
                  type="text"
                  name="inputValue"
                  placeholder="Enter value"
                  size="3"
                  onChange={handleChange}
                />
                <button type="submit">Submit</button>
              </form>
            </div>
            <div className="display_content">
              <div className="content">
                <span className="sum">Total Sum(Upto 5 Decimal Places)</span>
                <span className="value">{data.sum}</span>
              </div>
              <div className="content">
                <span className="sum">Total Number of Wallets</span>
                <span className="value">{data.wallet_num}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
