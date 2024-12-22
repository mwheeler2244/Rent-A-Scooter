import React from "react";
import { use } from "react";
import { useOutletContext } from "react-router-dom";

function Description() {
  const rvDetails = useOutletContext();
  return (
    <section className="host-rvs-detail-info">
      <h4>
        Name: <span>{rvDetails.name}</span>
      </h4>
      <h4>
        Category: <span>{rvDetails.type}</span>
      </h4>
      <h4>
        Description: <span>{rvDetails.description}</span>
      </h4>
      <h4>
        Visibility: <span>Public</span>
      </h4>
    </section>
  );
}

export default Description;
