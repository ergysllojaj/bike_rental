import React from "react";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBikesContext } from "../hooks/useBikesContext";

export default function BikeForm() {
  const { model, color, location, rating, isAvailable, isNew, _id, dispatch } =
    useBikesContext();
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to add a bike");
      return;
    }
    if (!model || !color || !location || !rating) {
      setError("All fields are required");
      return;
    }
    setError(null);
    const bike = { model, color, location, rating, isAvailable, _id };
    if (isNew) {
      try {
        const response = await fetch("/api/bikes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
          body: JSON.stringify(bike),
        });
        const data = await response.json();
        dispatch({ type: "CREATE_BIKE", payload: data });
      } catch (err) {
        setError(err.message);
      }
    } else {
      try {
        const response = await fetch(`/api/bikes/${_id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}`,
          },
          body: JSON.stringify(bike),
        });
        const data = await response.json();
        dispatch({ type: "UPDATE_BIKE", payload: bike });
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3> Add a new bike</h3>
      <label>Model:</label>
      <input
        type="text"
        value={model}
        onChange={(e) =>
          dispatch({
            type: "SET_MODEL",
            payload: {
              model: e.target.value,
            },
          })
        }
      />
      <br />
      <label>Color:</label>
      <input
        type="text"
        value={color}
        onChange={(e) =>
          dispatch({
            type: "SET_COLOR",
            payload: {
              color: e.target.value,
            },
          })
        }
      />
      <br />
      <label>Location:</label>
      <input
        type="text"
        value={location}
        onChange={(e) =>
          dispatch({
            type: "SET_LOCATION",
            payload: {
              location: e.target.value,
            },
          })
        }
      />
      <br />
      <label>Rating:</label>
      <input
        type="number"
        value={rating}
        onChange={(e) =>
          dispatch({
            type: "SET_RATING",
            payload: {
              rating: e.target.value,
            },
          })
        }
      />
      <br />
      <label>Availability:</label>
      <input
        type="checkbox"
        checked={isAvailable}
        onChange={(e) =>
          dispatch({
            type: "SET_IS_AVAILABLE",
            payload: {
              isAvailable: e.target.checked,
            },
          })
        }
      />
      <br /> <br />
      <button type="submit">{isNew ? "Add" : "Edit"} bike</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
