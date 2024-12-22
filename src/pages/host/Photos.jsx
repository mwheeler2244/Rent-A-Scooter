import React from "react";
import { useOutletContext } from "react-router-dom";

function Photos() {
  const rvDetails = useOutletContext();
  return (
    <div>
      <img style={{ width: "100px" }} src={rvDetails.imageUrl} alt="" />
    </div>
  );
}

export default Photos;
