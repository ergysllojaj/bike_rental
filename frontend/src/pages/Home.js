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
        console.log("Errorr");
      }
    };
  }, []);

  return (
    <div className="home">
      <div className="bikes">
        {bikes.map((bike) => (
          <BikeDetails key={bike.id} bike={bike} />
        ))}
      </div>
    </div>
  );
}
