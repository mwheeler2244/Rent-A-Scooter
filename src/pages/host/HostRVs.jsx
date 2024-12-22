import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHostScooter } from "../../Api";
function HostRVs() {
  const [hostRV, setHostRV] = useState([]);

  useEffect(() => {
    async function loadHostScooters() {
      const data = await getHostScooter();
      setHostRV(data);
    }
    loadHostScooters();
  }, []);

  return (
    <section>
      <h1 className="host-rvs-title">Your listed RVs</h1>

      <div className="host-rvs-list">
        {hostRV ? (
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
          <p>you do not have any RVs listed</p>
        )}
      </div>
    </section>
  );
}

export default HostRVs;
