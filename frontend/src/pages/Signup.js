import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
const Signup = () => {
  const [email, set] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async function (e) {
    e.preventDefault();
    console.log(email, password);
    await signup(email, password);
  };

  return (
    <div className="create login-form-conatiner">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => set(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button disabled={isLoading} type="submit">
          Signup
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
