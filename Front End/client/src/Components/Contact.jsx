import React from "react";
import { MainButton } from "./Buttons/Buttons";
import '../assets/styles/Contact.css'

function Contact () {
    return (
      <section className="contacts-section">
        <h2>CONTACT US</h2>

        <div className="contact-container">
          <p>Let's get in touch</p>
          <form className="contact-form">
            <div className="input-row">
              <input
                type="text"
                placeholder="First Name"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid white",
                }}
                className=" text-white"
              />
              <input
                type="text"
                placeholder="Last Name"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid white",
                }}
              />
            </div>
            <div className="input-row text-white">
              <input
                type="email"
                placeholder="Email"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid white",
                }}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid white",
                }}
              />

              <input
                type="text"
                placeholder="Subject"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid white",
                }}
              />
            </div>
            <textarea placeholder="Write something..."></textarea>
            <MainButton
              style={{
                color: "white",
                padding: "10px 20px",
                backgroundColor: "#a3a3a3",
              }}
            >
              Send Message
            </MainButton>
          </form>
        </div>
      </section>
    );
}

export default Contact;