import React from "react";
import "../../Server";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getScooters } from "../../Api";

function RVs() {
  const [rvs, setRvs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");

  const filteredRVs = typeFilter
    ? rvs.filter((rv) => rv.type === typeFilter)
    : rvs;

  useEffect(() => {
    async function loadScooter() {
      const data = await getScooters();
      setRvs(data);
    }
    loadScooter();
  }, []);

  return (
    <div className="rv-list-container">
      <h1>Explore our RV options</h1>

      <nav>
        <button
          onClick={() => setSearchParams({ type: "luxury" })}
          className={
            typeFilter === "luxury"
              ? "rvs-type luxury selected"
              : "rvs-type luxury"
          }
        >
          Luxury
        </button>

        <button
          className={
            typeFilter === "simple"
              ? "rvs-type simple selected"
              : "rvs-type simple"
          }
          onClick={() => setSearchParams({ type: "simple" })}
        >
          Simple
        </button>

        {typeFilter && (
          <button className="rvs-type" onClick={() => setSearchParams({})}>
            Clear
          </button>
        )}
      </nav>

      <div className="rv-list">
        {filteredRVs.map((rv) => (
          <div key={rv.id} className="rv-tile">
            <Link
              state={{
                search: `?${searchParams.toString()}`,
                type: typeFilter,
              }}
              to={`${rv.id}`}
            >
              <img src={rv.imageUrl} />
              <div className="rv-info">
                <h3>{rv.name}</h3>
                <p>
                  ${rv.price}
                  <span>/day</span>
                </p>
              </div>
              <i className={`rv-type ${rv.type} selected`}>{rv.type}</i>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RVs;
