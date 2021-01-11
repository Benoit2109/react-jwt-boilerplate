import React, { useState } from "react";
import Axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      Axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/login`, {
        email,
        password,
      })
        .then((res) => res.data)
        .then((data) => {
          localStorage.setItem("TOKEN", data.token);
          alert("Logged Successfully");
        })
        .catch((err) => console.log(err.response.data.errormessage));
    } else {
      alert("Please specify both email and password");
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            placeholder="votreemail@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        Password:
        <label htmlFor="password">
          <input
            type="text"
            name="password"
            id="password"
            placeholder="*******"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <label htmlFor="submit">
          <input type="submit" name="Se connecter" onClick={handleSubmit} />
        </label>
      </form>
    </div>
  );
};

export default Login;
