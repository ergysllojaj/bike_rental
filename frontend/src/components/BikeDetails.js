import React from "react";
import { useBikesContext } from "../hooks/useBikesContext";

export default function BikeDetails({ bike }) {
  const { dispatch } = useBikesContext();

  const handleClick = async () => {
    const res = await fetch(`/api/bikes/${bike._id}`, {
      method: "DELETE",
    });

    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_BIKE", payload: json });
    }
  };

  return (
    <div className="bikedetails">
      <h3>
        <b>Model:</b> {bike.model}
      </h3>
      <p>
        <b>Color:</b> {bike.color}
      </p>
      <p>
        <b>Location:</b> {bike.location}
      </p>
      <p>
        <b>Rating:</b> {bike.rating}
      </p>
      <p
        className="availability"
        style={{ color: bike.isAvailable ? "green" : "red" }}
      >
        {bike.isAvailable ? "Available" : "Not available"}
      </p>
      <br />
      <br />
      <spvan onClick={handleClick}>[Delete]</spvan>
    </div>
  );
}
