import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async function (e) {
    e.preventDefault();
    await signup(email, password, companyCode);
  };

  return (
    <div className="create login-form-conatiner">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label>
          Company code:<br></br> Insert "COMPANYCODE" to sign up as an admin or
          leave it empty to sign up as a user
        </label>
        <input
          type="password"
          value={companyCode}
          onChange={(e) => setCompanyCode(e.target.value)}
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
