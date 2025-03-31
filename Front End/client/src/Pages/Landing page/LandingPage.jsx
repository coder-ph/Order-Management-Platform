import React from "react";
import { FaBehance, FaDribble } from "react-icons/fa";
import { IoMailOutline, IoChevronForwardCircle, IoStar } from "react-icons/io5";
import { IconContext } from "react-icons/lib";

function LandingPage() {
  return (
    <>
      <Header>
        <div className="logo_wraper">
          Quantum<span>Leap</span>
        </div>
        <div className="menu_container">
          <span>
            <IconContext.Provider
              value={{
                color: "#000",
                size: "18px",
                className: "icons_container",
              }}
            >
              <div className="icon">
                <FaBehance />
              </div>
              <div className="icon">
                <FaDribble />
              </div>
            </IconContext.Provider>
          </span>
          <span>
            <IconContext.Provider
              value={{
                color: "#000",
                size: "18px",
              }}
            >
              <div className="icon">
                <IoMailOutline />
              </div>
              quantumleap@co.ke
            </IconContext.Provider>
          </span>
          <span className="menu"></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </Header>

      <div className="content_wrapper">
        <div className="left_content_wrapper">
          <h2>
            <span>Revolutionizing Logistics</span>
            <span>For the Digital Age</span>
          </h2>
          <p2>
            Quantum Leap Innovations introduces a groundbreaking logistics
            solution-no extra hardware, just smart technology
          </p2>
          <div className="btn_group">
            
          </div>
        </div>
        <div className="right_content_wrapper"></div>
      </div>
    </>
  );
}

export default LandingPage;
