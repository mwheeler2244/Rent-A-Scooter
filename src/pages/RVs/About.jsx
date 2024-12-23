import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-page-container">
      <div className="about-page-content">
        <h1>Don’t settle for a car when you could cruise on a scooter.</h1>
        <p>
          Our mission is to elevate your city adventure with the perfect scooter
          rental. All our scooters are checked and ready for your journey, so
          you can ride with peace of mind. (Helmets are provided for your safety
          😉)
        </p>
        <p>
          Our team is passionate about scooters and we believe that exploring
          the world on two wheels is the best way to experience it.
        </p>
      </div>
      <div className="about-page-cta">
        <h2>
          Your adventure awaits.
          <br />
          Your scooter is ready.
        </h2>
        <Link className="link-button" to="/rvs">
          Explore our scooters
        </Link>
      </div>
    </div>
  );
}

export default About;
