import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import BikeDetails from "../components/BikeDetails";

export default function Home() {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const fetchBikes = async () => {
      const res = await fetch("/api/bikes");
      const json = await res.json();

      if (res.ok) {
        console.log(json);
        setBikes(json);
      }
    };

    fetchBikes();
  }, []);

  return (
    <div className="home">
      <div className="bikes">
        {bikes.map((bike) => (
          <BikeDetails key={bike.id} bike={bike} />
        ))}
      </div>
      <h1>{bikes.length}</h1>
    </div>
  );
}
