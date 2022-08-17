import React from "react";

export default function ({ bike }) {
  return (
    <div className="bikedetails">
      <h3>Model: {bike.model}</h3>
      <p>Color: {bike.color}</p>
      <p>Location: {bike.location}</p>
      <p>Rating: {bike.rating}</p>
      {/* Checkbox needed for availability */}
      <p>{bike.available ? "Available" : "Not available"}</p>
    </div>
  );
}
