import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PublicNavbar from "../../pages/PublicNavbar";
import Footer from "../Footer";

const Donation = () => {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleDonation = async () => {
    setLoading(true);
    try {
      const donationAmount = customAmount ? customAmount : amount;
      if (!user.name || !user.email || !donationAmount || !paymentMethod) {
        setMessage("Please fill all fields!");
        setLoading(false);
        return;
      }

      const donationData = {
        donorName: user.name,
        email: user.email,
        amount: donationAmount,
        paymentMethod,
      };

      await axios.post("/api/donations", donationData);
      setMessage("Thank you for your donation!");
      setAmount("");
      setCustomAmount("");
      setPaymentMethod("UPI");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <PublicNavbar />
      <div
        className="container-fluid py-5"
        style={{
          backgroundImage: "linear-gradient(to right, #f8cdda, #fbd786)",
          minHeight: "100vh",
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center">
            {/* Left Side - Image with Creative Text */}
            <div className="col-md-6 mb-4 mb-md-0 d-flex flex-column align-items-center">
              <h3 className="mb-4 text-center fw-semibold" style={{ color: "#343a40" }}>
                "A small act of kindness today can bloom into a better tomorrow."
              </h3>
              <img
                src="https://thumbs.dreamstime.com/b/donate-money-online-donation-payment-laptop-251070594.jpg"
                alt="Donate"
                className="img-fluid rounded shadow"
                style={{
                  maxHeight: "450px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                }}
              />
            </div>

            {/* Right Side - Form */}
            <div className="col-md-6">
              <h1 className="text-primary fw-bold mb-3 text-center">
                Make a Donation
              </h1>
              <p className="text-muted mb-4 text-center" style={{ fontStyle: "italic" }}>
                Your support helps those in need!
              </p>

              <div className="card p-4 shadow-lg text-center">
                <h4 className="mb-3">Enter Your Details</h4>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={user.name}
                  disabled
                />
                <input
                  type="email"
                  className="form-control mb-3"
                  value={user.email}
                  disabled
                />

                {/* Predefined Amounts */}
                <div className="mb-3">
                  {[50, 100, 250, 500].map((value) => (
                    <button
                      key={value}
                      className={`btn me-2 mb-2 ${
                        amount === value ? "btn-success" : "btn-outline-primary"
                      }`}
                      onClick={() => {
                        setAmount(value);
                        setCustomAmount("");
                      }}
                      style={{
                        padding: "10px 20px",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      ₹{value}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  className="form-control mb-3"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setAmount("");
                  }}
                />

                {/* Payment Method */}
                <select
                  className="form-select mb-3"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                >
                  <option value="UPI">UPI</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Net Banking">Net Banking</option>
                </select>

                <button
                  className="btn btn-primary w-100"
                  onClick={handleDonation}
                  disabled={loading}
                  style={{
                    padding: "12px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {loading ? "Processing..." : "Donate Now"}
                </button>

                {message && <p className="mt-3 text-success">{message}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Donation;
