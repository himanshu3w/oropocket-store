import Web3 from "web3";
import { convertToEther, convertToWei } from "./utlis";
import { ABI } from "./ABI";
const CONTRACT_ADDRESS = "0x50C1Bec312AB845b659cF81373c8bAd79710c870";
// This function will Store the Value From The User

export const storeFunction = async (value) => {
  console.log("value", value);
  console.log("finalvalue", convertToWei(value));
  value =convertToWei(value)
  if (typeof window.ethereum !== "undefined") {
  }
  try {
    let provider = window.ethereum;
    const web3 = new Web3(provider);

    let getAccount = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const contractInstance = await new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    const gasLimit = await contractInstance.methods
      .store(value)
      .estimateGas({ from: getAccount[0] });
    const bufferedGasLimit = Math.round(
      Number(gasLimit) + Number(gasLimit) * Number(0.2)
    );
    await contractInstance.methods
      .store(value)
      .send({
        from: getAccount[0],
        gasLimit: bufferedGasLimit,
      })
      .on("transactionHash", (hash) => {
        console.log("Transaction hash created for stake! : ", hash);
      })
      .on("receipt", async () => {
        console.log("Staked successfully!");
      })
      .on("error", (error) => {
        console.error("error", error.message);
      });
  } catch (error) {
    console.error(error);
  }
  console.log("WRITE_FUNCTION_COMPLETE");
  console.log("PAUSING FOR  10 SECONDS");
  await new Promise((resolve) => setTimeout(resolve, 10000)); // 10 sec
  console.log("PAUSE COMPLETE FOR  10 SECONDS");
  return { status: "success", retriveDetails: await retriveDetailsFunction() };
};

// This function will Retrive the Latest Value From The User
export const retriveDetailsFunction = async () => {
  console.log("INSIDE RETRIVE DATA FUNCTION -> STARTED");
  let provider = window.ethereum;

  const web3 = new Web3(provider);
  // const networkId = await web3.eth.net.getId();
  const contractInstance = await new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
  console.log("balance", contractInstance);
  const balance = await contractInstance.methods.retriveDetails().call();
  console.log("balance", balance);

  // const dinoTokenContract = new web3.eth.Contract(dino_token_abi, dino_token_address);

  console.log("INSIDE RETRIVE DATA FUNCTION -> COMPLETED");
  return {
    total_sum: parseFloat(convertToEther(balance[0])).toFixed(5),
    total_number_of_wallets: balance[1],
  };
};
