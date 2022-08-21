import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const login = async function (email, password) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsLoading(false);
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: "LOGIN", payload: data }); //setLogin(data);
        //redirect based on role
        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setIsLoading(false);
        setError(data.message);
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };
  return { login, error, isLoading };
};
