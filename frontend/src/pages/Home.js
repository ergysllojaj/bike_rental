import React from "react";
import { useEffect, useState } from "react";
import BikeDetails from "../components/BikeDetails";
import BikeForm from "../components/BikeForm";

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
        {bikes &&
          bikes.map((bike) => <BikeDetails key={bike._id} bike={bike} />)}
      </div>
      <BikeForm />
    </div>
  );
}
