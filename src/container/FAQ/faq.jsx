import React, { useState } from "react";
import Footer from "../../components/Shared/Footer/Footer";
import Header from "../../components/Shared/Header/Header";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { faqList } from "../../data";

const FAQ = () => {
  const [collapse, setCollapse] = useState(false);
  const toggle = (index) => {
    if (collapse === index) {
      return setCollapse(null);
    }
    setCollapse(index);
  };
  return (
    <>
      <Header />
      <div className="faq_wrapper">
        <div className="container">
          <div className="faq_content">
            <div className="title">
              <h2>Frequently asked questions</h2>
            </div>
            <div className="faq_accordion_lists">
              {faqList.map((d) => (
                <div key={d.id} className="faq_accordion_card">
                  <div className="ques" onClick={() => toggle(d.id)}>
                    <h2>{d.ques}</h2>
                    <span>
                      {collapse === d.id ? (
                        <IoIosArrowDown />
                      ) : (
                        <IoIosArrowUp />
                      )}
                    </span>
                  </div>
                  {collapse === d.id ? (
                    <div className="ans">
                      <p>{d.ans}</p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
