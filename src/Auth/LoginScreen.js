import React, { useState } from "react";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import LoginDialog from "../dialog/LoginDialog";
const API_URL = "http://131.181.190.87:3000";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failCounter, setFailCounter] = useState(0);
  const [togglePassword, setTogglePassword] = useState(false);
  let history = useHistory();

  const login = () => {
    const url = `${API_URL}/user/login`;
    return fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert(res.message);
          setEmail("");
          setPassword("");
          setFailCounter(failCounter + 1);
          console.log(res);
        } else {
          localStorage.setItem("token", JSON.stringify(res.token));
          history.push("/");
        }
      });
  };
  const togglePasswordFunc = () => {
    setTogglePassword(!togglePassword);
  };

  const register = () => {
    history.push("/signup");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  return (
    <div>
      <h1>
        <div
          className="span font-weight-bold"
          style={{
            textAlign: "center",
            position: "relative",
            top: 50,
            color: "LightBlue",
            fontSize: 50,
          }}
        >
          Login
        </div>
      </h1>
      <Form
        onSubmit={handleSubmit}
        className="login-form"
        style={styles.loginForm}
      >
        <FormGroup style={{ position: "relative" }}>
          <Label>Email</Label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          />

          <Label>Password</Label>
          <input
            type={togglePassword ? "text" : "password"}
            placeholder="password"
            onChange={handlePassword}
            value={password}
          />
          <FontAwesomeIcon
            icon={togglePassword ? faEyeSlash : faEye}
            // style={styles.passwordIcon}
            onClick={togglePasswordFunc}
            style={{ position: "absolute", right: 10, bottom: 15 }}
          />
        </FormGroup>
        <Button onClick={login} className="btn-lg btn-info btn-block ">
          Login
        </Button>
        <Button onClick={register} className="btn-lg btn-secondary btn-block">
          Register
        </Button>
      </Form>
      <LoginDialog
        showDialogCounter={failCounter}
        setCounter={setFailCounter}
      ></LoginDialog>
    </div>
  );
};

export default LoginScreen;

const styles = {
  loginForm: {
    width: "45%",
    maxwidth: "30px",
    margin: "auto",
    height: 100,
    padding: "4em",
  },
  passwordIcon: {
    flex: 1,
    position: "absolute",
    top: 330,
    botton: 90,
    right: 420,
    cursor: "pointer",
  },
};
