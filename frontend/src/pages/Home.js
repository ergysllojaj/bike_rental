import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BikeDetails from "../components/BikeDetails";

export default function Home() {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await fetch("api/bikes");
      const json = await res.json();
      if (res.ok) {
        setBikes(json);
      } else {
        console.log("Error");
      }
    };
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {setBikes.map((bike) => (
          <BikeDetails key={bike.id} bike={bike} />
        ))}
      </div>
    </div>
  );
}
