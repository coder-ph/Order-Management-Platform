import React from "react";
import {
  IoMailOutline,
  IoChevronForward,
  IoApps,
  IoNotifications,
  IoPieChart,
  IoNewspaper,
  IoCard,
  IoColorFill,
} from "react-icons/io5";
import { IconContext } from "react-icons/lib";

function Card() {
  return (
    <>
      <div className="service_container">
        <div className="title_wrapper"></div>
        <span className="service_title">Our Services</span>
        <h2>Save Time Managing Your Logistics</h2>
      </div>
      <div className="service_card">
        <div className="card">
          <span className="service_icon" style={{ backgroundColor: "ddfbf9" }}>
            <IconContext.Provider
              value={{
                color: "#14da8f",
                size: "22px",
              }}
            >
              <IoMailOutline />
            </IconContext.Provider>
          </span>
          <a href="#">
            <span>learn more</span>
            <IconContext.Provider
              value={{
                color: "#14da8f",
                size: "18px",
              }}
            >
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </div>
        <div className="card">
          <span className="service_icon" style={{ backgroundColor: "ddfbf9" }}>
            <IconContext.Provider
              value={{
                color: "#14da8f",
                size: "22px",
              }}
            >
              <IoMailOutline />
            </IconContext.Provider>
          </span>
          <a href="#">
            <span>learn more</span>
            <IconContext.Provider
              value={{
                color: "#14da8f",
                size: "18px",
              }}
            >
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </div>
        <div className="card">
          <span className="service_icon" style={{ backgroundColor: "ddfbf9" }}>
            <IconContext.Provider
              value={{
                color: "#14da8f",
                size: "22px",
              }}
            >
              <IoMailOutline />
            </IconContext.Provider>
          </span>
          <a href="#">
            <span>learn more</span>
            <IconContext.Provider
              value={{
                color: "#14da8f",
                size: "18px",
              }}
            >
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </div>
        <div className="card">
          <span className="service_icon" style={{ backgroundColor: "ddfbf9" }}>
            <IconContext.Provider
              value={{
                color: "#14da8f",
                size: "22px",
              }}
            >
              <IoMailOutline />
            </IconContext.Provider>
          </span>
          <a href="#">
            <span>learn more</span>
            <IconContext.Provider
              value={{
                color: "#14da8f",
                size: "18px",
              }}
            >
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </div>
        <div className="card">
          <span className="service_icon" style={{ backgroundColor: "ddfbf9" }}>
            <IconContext.Provider
              value={{
                color: "#14da8f",
                size: "22px",
              }}
            >
              <IoMailOutline />
            </IconContext.Provider>
          </span>
          <a href="#">
            <span>learn more</span>
            <IconContext.Provider
              value={{
                color: "#14da8f",
                size: "18px",
              }}
            >
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </div>
        <div className="card">
          <span className="service_icon" style={{ backgroundColor: "ddfbf9" }}>
            <IconContext.Provider
              value={{
                color: "#14da8f",
                size: "22px",
              }}
            >
              <IoMailOutline />
            </IconContext.Provider>
          </span>
          <a href="#">
            <span>learn more</span>
            <IconContext.Provider
              value={{
                color: "#14da8f",
                size: "18px",
              }}
            >
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </div>
        <div className="card">
          <span className="service_icon" style={{ backgroundColor: "ddfbf9" }}>
            <IconContext.Provider
              value={{
                color: "#14da8f",
                size: "22px",
              }}
            >
              <IoMailOutline />
            </IconContext.Provider>
          </span>
          <a href="#">
            <span>learn more</span>
            <IconContext.Provider
              value={{
                color: "#14da8f",
                size: "18px",
              }}
            >
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </div>
        <div className="card">
          <span className="service_icon" style={{ backgroundColor: "ddfbf9" }}>
            <IconContext.Provider
              value={{
                color: "#14da8f",
                size: "22px",
              }}
            >
              <IoMailOutline />
            </IconContext.Provider>
          </span>
          <a href="#">
            <span>learn more</span>
            <IconContext.Provider
              value={{
                color: "#14da8f",
                size: "18px",
              }}
            >
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </div>
      </div>
    </>
  );
}

export default Card;
