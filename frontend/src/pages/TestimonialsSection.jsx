import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TestimonialsSection = () => {
  const testimonials = [
    { id: 1, text: "HopeConnect changed lives by bridging the gap between donors and those in need!", name: "John Doe" },
    { id: 2, text: "An incredible platform that truly cares about making a difference!", name: "Jane Smith" },
    { id: 3, text: "This initiative has brought hope to countless lives. Thank you HopeConnect!", name: "Michael Brown" },
    { id: 4, text: "I was able to make a real impact with my small donations. Amazing work!", name: "Sarah Wilson" },
    { id: 5, text: "Their work is inspiring. Keep up the great efforts!", name: "David Lee" },
    { id: 6, text: "Thanks to HopeConnect, we’re closer to creating a better future!", name: "Emily Davis" },
  ];

  return (
    <section className="testimonials-section">
      <div className="container text-center">
        <h2 className="section-title">✨ What People Say ✨</h2>
        <div className="row justify-content-center">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="col-md-4">
              <div className="flip-card">
                <div className="flip-card-inner">
                  {/* Front Side */}
                  <div className="flip-card-front">
                    <h5 className="testimonial-name">{testimonial.name}</h5>
                  </div>
                  {/* Back Side */}
                  <div className="flip-card-back">
                    <p className="testimonial-text">"{testimonial.text}"</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Styling */}
      <style>
        {`
          /* Background with Glassmorphism Effect */
          .testimonials-section {
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            color: white;
            padding: 80px 0;
            position: relative;
            overflow: hidden;
          }

          .testimonials-section::before {
            content: "";
            position: absolute;
            top: -50px;
            left: -50px;
            width: 200px;
            height: 200px;
            background: rgba(255, 255, 255, 0.2);
            filter: blur(50px);
            z-index: 0;
          }

          .testimonials-section::after {
            content: "";
            position: absolute;
            bottom: -50px;
            right: -50px;
            width: 200px;
            height: 200px;
            background: rgba(255, 255, 255, 0.2);
            filter: blur(50px);
            z-index: 0;
          }

          /* Section Title */
          .section-title {
            font-size: 2rem;
            font-weight: bold;
            color: #ffcc00;
            text-shadow: 0 0 15px rgba(255, 204, 0, 0.8);
            margin-bottom: 40px;
          }

          /* Flip Card Effect */
          .flip-card {
            background: transparent;
            width: 250px;
            height: 250px;
            perspective: 1000px;
            margin: 20px auto;
          }

          .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.6s;
            transform-style: preserve-3d;
          }

          .flip-card:hover .flip-card-inner {
            transform: rotateY(180deg);
          }

          .flip-card-front, .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 15px;
            backface-visibility: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
            transition: box-shadow 0.3s;
          }

          .flip-card-front {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #ffcc00;
            font-size: 1.3rem;
            font-weight: bold;
            text-transform: uppercase;
          }

          .flip-card-back {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: #fff;
            font-size: 1.1rem;
            font-weight: 500;
            transform: rotateY(180deg);
          }

          /* Hover Glow Effect */
          .flip-card:hover .flip-card-front,
          .flip-card:hover .flip-card-back {
            box-shadow: 0 0 30px rgba(255, 204, 0, 0.6);
          }

        `}
      </style>
    </section>
  );
};

export default TestimonialsSection;
