import React, { useRef, useState } from "react";
import ethereum from "../../../assets/img/ethereum.svg";
import polygon from "../../../assets/img/polygon.svg";

import { useClickOutside } from "../../../hooks/useClickOutside";
import { IoWallet } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";
import metamask from "../../../assets/img/MetaMask.svg";
import WalletConnect from "../../../assets/img/WalletConnect.svg";
import { network_details } from "../../../config";
export const networkList = [
  {
    id: "mfsere7r7",
    name: "Ethereum Rinkeby",
    img: ethereum,
    network_details: network_details.rinkeby,
  },
  {
    id: "mvnusuer",
    name: "Ropsten",
    img: polygon,
    network_details: network_details.ropsten,
  },
];

const Header = ({ wallet }) => {
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setOpenModal(false));

  return (
    <>
      <div className="header_wrapper">
        <div className="container">
          <div className="header_twice_container">
            <div className="header_logo">
              <Link to="/">
                <h2>Learn Blockchain</h2>
              </Link>
            </div>
            <div className="header_left_content">
              <div className="network_selector">
                <div className="connect_wlt_btn">
                  <Button
                    type="button"
                    className="connect_btn"
                  >
                    {wallet}
                  </Button>
                </div>
              </div>
              <div className="network_selector">
                <div className="connect_wlt_btn">
                  <Button
                    type="button"
                    onClick={() => {
                      setOpenModal(!openModal);
                      modalRef.current.showModal();
                    }}
                    className="connect_btn"
                  >
                    <IoWallet /> <span>connect wallet</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
      <Modal openModal={openModal} modalRef={modalRef}>
        <div className="title">
          <h2>Connect your wallet</h2>
          <span onClick={() => setOpenModal(false)}>&times;</span>
        </div>
        <div className="wallet_img">
          <div className="img_box">
            <img src={metamask} alt="meta" />
            <h3>MetaMask</h3>
          </div>
          <div className="img_box">
            <img src={WalletConnect} alt="meta" />
            <h3>WalletConnect</h3>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
