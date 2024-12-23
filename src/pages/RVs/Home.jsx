import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <h1>Ready to ride? We've got the perfect scooter for you.</h1>
      <p>
        Explore the city on your terms with our wide selection of scooters.
        Whether you're cruising for leisure or commuting, find the scooter that
        fits your adventure.
      </p>
      <Link className="home-link" to="./rvs">
        Find your Scooter
      </Link>
    </div>
  );
}

export default Home;
