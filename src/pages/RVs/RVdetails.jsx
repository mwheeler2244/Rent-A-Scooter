import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getScooter } from "../../Api";

function RVdetails() {
  const { id } = useParams();
  const [rv, setRv] = useState([]);
  const location = useLocation();

  useEffect(() => {
    async function loadScooter() {
      const data = await getScooter(id);
      setRv(data);
    }

    loadScooter();
  }, [id]);

  const typeLink = location.state?.type || "";
  const searchLink = location.state?.search || "";
  console.log(searchLink);
  return (
    <div className="rv-detail-container">
      <Link to={`..${searchLink}`} relative="path">
        back to {typeLink} RVs
      </Link>
      {rv ? (
        <div className="rv-detail">
          <img src={rv.imageUrl} />
          <i className={`rv-type ${rv.type} selected`}>{rv.type}</i>
          <h2>{rv.name}</h2>
          <p className="rv-price">
            <span>${rv.price}</span>/day
          </p>
          <p>{rv.description}</p>
          <button className="link-button">Rent this rv</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default RVdetails;
