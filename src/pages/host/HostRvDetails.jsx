import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { getScooter } from "../../Api";

function HostRvDetails() {
  const { id } = useParams();
  const [RVdetails, setRvDetails] = useState({});

  const linkStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "purple",
  };
  useEffect(() => {
    async function loadHostDetails() {
      const data = await getScooter(id);
      setRvDetails(data);
    }
    loadHostDetails();
  }, [id]);

  if (!RVdetails) {
    return (
      <p>
        <strong>Loading...</strong>
      </p>
    );
  }

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr; <span className="back-link">Back to all vans</span>
      </Link>
      <div className="host-rvs-detail-layout-container">
        <div className="host-rvs-detail">
          <img src={RVdetails.imageUrl} />
          <div className="host-rvs-detail-info-text">
            <i className={`rv-type rvs-type-${RVdetails.type}`}>
              {RVdetails.type}
            </i>
            <h3>{RVdetails.name}</h3>
            <h4>${RVdetails.price}/day</h4>
          </div>
        </div>
      </div>
      <nav className="host-rvs-detail-nav">
        <NavLink
          to="."
          style={({ isActive }) => (isActive ? linkStyles : null)}
          end
        >
          Description
        </NavLink>
        <NavLink
          to="photos"
          style={({ isActive }) => (isActive ? linkStyles : null)}
        >
          Photos
        </NavLink>
      </nav>

      <Outlet context={RVdetails} />
    </section>
  );
}

export default HostRvDetails;
