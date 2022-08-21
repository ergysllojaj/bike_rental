import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBikesContext } from "../hooks/useBikesContext";

export default function BikeDetails({ bike }) {
  const { dispatch } = useBikesContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const res = await fetch(`/api/bikes/${bike._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });

    const json = await res.json();

    if (res.ok) {
      dispatch({ type: "DELETE_BIKE", payload: json });
    }
  };

  const handleEdit = () => {
    dispatch({ type: "SET_EDIT_FORM", payload: bike });
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
      {user && user.role === "admin" && (
        <div>
          <span onClick={handleClick}>[Delete]</span>
          <span onClick={handleEdit}>Edit</span>
        </div>
      )}
    </div>
  );
}
