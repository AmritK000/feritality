import React, { useEffect } from "react";

const PaymentGateway = () => {
    const amount = 1; // Static amount
    const currency = "KWD"; // Static currency
    const customer = { name: "John Doe", email: "john.doe@example.com" , country_code: "91", number: "7004072993",}; // Static customer data
    const redirectUrl = "https://yourwebsite.com/success"; // Static redirect URL

    const handlePayment = async () => {
        try {
            console.log("Sending payment request to server...");
            const response = await fetch("https://api.tryfrisbee.com/front/v1/bookingservices/training/tap-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token:"",
                    amount,
                    currency,
                    customer,
                }),
            });
            const data = await response.json();
            console.log("Payment response: ", data);
            if (data.success) {
                window.location.href = redirectUrl; // Redirect on success
            } else {
                alert("Payment failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during payment: ", error);
            alert("There was an error with the payment. Please try again.");
        }
    };

    return (
        <div>
            <form id="payment-form">
                <div id="tap-card-element"></div>
                <button type="submit"  onClick={handlePayment}>Pay Now</button>
            </form>
        </div>
    );
};

export default PaymentGateway;
