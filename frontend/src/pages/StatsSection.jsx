import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";

const StatsSection = () => {
  useEffect(() => {
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      const animateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / 100;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(animateCount, 20);
        } else {
          counter.innerText = target;
        }
      };
      animateCount();
    });
  }, []);

  return (
    <section className="py-5 text-white text-center bg-dark bg-gradient">
      <div className="container">
        <h2 className="fw-bold mb-4 normal-text animate__animated animate__fadeInDown">
          🔥 Our Impact 🔥
        </h2>

        <div className="row justify-content-center">
          {/* People Helped */}
          <div className="col-md-4">
            <div className="card fire-card">
              <div className="card-body">
                <i className="bi bi-people-fill text-primary fs-1"></i>
                <h3 className="fw-bold mt-3 display-5 counter normal-text" data-target="200">0</h3>
                <p className="fs-5 text-secondary">People Helped</p>
              </div>
            </div>
          </div>

          {/* Cases Reported */}
          <div className="col-md-4">
            <div className="card fire-card">
              <div className="card-body">
                <i className="bi bi-file-earmark-text-fill text-danger fs-1"></i>
                <h3 className="fw-bold mt-3 display-5 counter normal-text" data-target="500">0</h3>
                <p className="fs-5 text-secondary">Cases Reported</p>
              </div>
            </div>
          </div>

          {/* Donations Raised */}
          <div className="col-md-4">
            <div className="card fire-card">
              <div className="card-body">
                <i className="bi bi-cash-coin text-success fs-1"></i>
                <h3 className="fw-bold mt-3 display-5 counter normal-text" data-target="1000000">0</h3>
                <p className="fs-5 text-secondary">Donations Raised (₹)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fire Effect Styles */}
      <style>
        {`
          /* Normal Text Style Before Hover */
          .normal-text {
            color: white;
            transition: color 0.3s ease-in-out, text-shadow 0.3s ease-in-out;
          }

          /* Glow Effect on Hover */
          .fire-card:hover .normal-text {
            color: #ff6a00;
            text-shadow: 0 0 20px rgba(255, 120, 0, 1), 0 0 30px rgba(255, 69, 0, 0.9);
          }

          .fire-card {
            position: relative;
            padding: 20px;
            background: #222;
            border-radius: 10px;
            overflow: hidden;
            color: white;
            text-align: center;
            transition: box-shadow 0.5s ease-in-out, transform 0.3s ease-in-out;
          }

          .fire-card:hover {
            box-shadow: 0 0 40px rgba(255, 69, 0, 1);
            transform: scale(1.05);
          }

          .fire-card::before,
          .fire-card::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 100%;
            width: 140%;
            height: 200%;
            background: radial-gradient(circle, rgba(255, 120, 0, 0.6) 20%, rgba(255, 69, 0, 0.5) 80%);
            filter: blur(10px);
            opacity: 0;
            transform: translateX(-50%);
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
          }

          .fire-card:hover::before,
          .fire-card:hover::after {
            opacity: 1;
            animation: flame-flicker 1.5s infinite alternate ease-in-out;
          }

          @keyframes flame-flicker {
            0% {
              transform: translateX(-50%) translateY(10px) scale(1);
              opacity: 0.8;
            }
            50% {
              transform: translateX(-50%) translateY(-10px) scale(1.1);
              opacity: 1;
            }
            100% {
              transform: translateX(-50%) translateY(-20px) scale(1);
              opacity: 0.8;
            }
          }
        `}
      </style>
    </section>
  );
};

export default StatsSection;
