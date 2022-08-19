import React from "react";
import { useState } from "react";
import { useBikesContext } from "../hooks/useBikesContext";

export default function BikeForm() {
  const { dispatch } = useBikesContext();
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bike = { model, color, location, rating, isAvailable };
    const res = await fetch("/api/bikes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bike),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error);
    }
    if (res.ok) {
      dispatch({ type: "CREATE_BIKE", payload: json });
      setError(null);
      setModel("");
      setColor("");
      setLocation("");
      setRating("");
      setIsAvailable(false);
      console.log("New bike added!");
      console.log(bike);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3> Add a new bike</h3>
      <label>Model:</label>
      <input
        type="text"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <br />
      <label>Color:</label>
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <br />
      <label>Location:</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <br />
      <label>Rating:</label>
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <br />
      {/* toggle checkbox is is available */}
      <label>Availability:</label>
      <input
        type="checkbox"
        checked={isAvailable}
        onChange={(e) =>
          e.target.checked ? setIsAvailable(true) : setIsAvailable(false)
        }
      />
      <br /> <br />
      <button type="submit">Add bike</button>
      {error && <p>{error}</p>}
    </form>
  );
}
