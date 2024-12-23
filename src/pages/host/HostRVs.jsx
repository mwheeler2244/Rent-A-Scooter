import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getHostScooter } from "../../Api";

function HostRVs() {
  const [hostRV, setHostRV] = useState([]);
  const [error, setError] = useState(null); // To capture any error
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    async function loadHostScooters() {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setError("No user is logged in");
        setLoading(false);
        return;
      }

      try {
        const data = await getHostScooter(user); // Pass the logged-in user to the function
        setHostRV(data);
      } catch (err) {
        setError("Error fetching scooters: " + err.message);
      } finally {
        setLoading(false);
      }
    }

    loadHostScooters();
  }, []); // Empty dependency array ensures this effect runs once on component mount

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section>
      <h1 className="host-rvs-title">Your listed RVs</h1>

      <div className="host-rvs-list">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {hostRV.length > 0 ? (
          hostRV.map((rv) => (
            <div key={rv.id}>
              <Link
                to={`${rv.id}`}
                key={rv.id}
                className="host-rvs-link-wrapper"
              >
                <div className="host-rvs-single" key={rv.id}>
                  <img src={rv.imageUrl} alt={`Photo of ${rv.name}`} />
                  <div className="host-rvs-info">
                    <h3>{rv.name}</h3>
                    <p>${rv.price}/day</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>You do not have any RVs listed</p>
        )}
      </div>
    </section>
  );
}

export default HostRVs;
