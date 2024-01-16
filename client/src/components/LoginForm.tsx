import { useState } from "react";
import { userRegister, userLogin, userLogout } from "../api/login.api";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const handleRegister = () => {
    userRegister(username, password, email, first_name, last_name)
      .then((res) => {
        console.log(res.data.message);
        setUsername("");
        setPassword("");
        setEmail("");
        setFirstName("");
        setLastName("");
      })
      .catch((error: any) => {
        console.error("Registration failed:", error.message);
      });
  };

  const handleLogin = () => {
    userLogin(username, password)
      .then((res) => {
        console.log(res.data.message);
        setUsername("");
        setPassword("");
      })
      .catch((error: any) => {
        console.error("Login failed:", error.message);
      });
  };

  const handleLogout = () => {
    userLogout()
      .then((res) => {
        console.log(res.data.message);
        setUsername("");
        setPassword("");
        setEmail("");
      })
      .catch((error: any) => {
        console.error("Logout failed:", error.response.data.message);
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="First Name"
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>

      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LoginForm;
