import React from "react";
import { useEffect } from "react";
import BikeDetails from "../components/BikeDetails";
import BikeForm from "../components/BikeForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useBikesContext } from "../hooks/useBikesContext";

export default function Home() {
  const { bikes, dispatch } = useBikesContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchBikes = async () => {
      const res = await fetch("/api/bikes", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await res.json();
      if (res.ok) {
        dispatch({ type: "SET_BIKES", payload: json });
      }
    };
    if (user) {
      fetchBikes();
    }
  }, [dispatch, user]);

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
