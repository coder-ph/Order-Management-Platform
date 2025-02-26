import React from "react";
import inventory from "../assets/icons/inventory-management.png"
import orders from "../assets/icons/order-processing.png"
import payment from "../assets/icons/payment-method.png"
import '../assets/styles/Services.css'

function Services () {
    return (
        <section className="services-section">
        <div className="services-container">
            <h2>OUR SERVICES</h2>
            <p>At [Your Company Name], we provide a seamless Order Management System designed to optimize your business operations, streamline workflows, and enhance customer satisfaction. Our platform offers a range of services to help you manage orders efficiently from start to finish.</p>
            <div className="service-cards">
                <div className="service-card">
                    <img src={orders} alt="Order processing" />
                    <h3>Order Processing and Automation</h3>
                    <p>Effortlessly manage incoming orders with automated processing, reducing manual errors and increasing efficiency. Track orders in real time and ensure timely fulfillment.</p>
                </div>
                <div className="service-card">
                    <img src={inventory} alt="Inventory management" />
                    <h3>Inventory Management</h3>
                    <p>Keep your stock levels in check with real-time inventory tracking. Our system automatically updates stock levels, preventing overselling and ensuring you never run out of high-demand products.</p>
                </div>
                <div className="service-card">
                    <img src={payment} alt="Secure payment" />
                    <h3>Secure Payment Processing</h3>
                    <p>Ensure safe and hassle-free transactions with secure payment gateways. Support multiple payment methods, including credit cards, M-Pesa, and bank transfers.</p>
                </div> 
            </div>  
        </div>
    </section>
    )
}

export default Services; 