import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

export default function Navbar() {
  const { isAuthenticated, user } = useAuthContext();
  const logout = useLogout();
  const handleLogout = () => {
    logout();
  };
  return (
    <header className="d-flex">
      <div className="container">
        <Link to={user && user.role === "admin" ? "/admin" : "/"}>Rental Bike</Link>
        {!isAuthenticated && (
          <div className="login-container">
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>
            {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
          </div>
        )}
        {isAuthenticated && (
          <div className="login-container">
            <span>{user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
}
