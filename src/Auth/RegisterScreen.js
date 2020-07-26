import React, { useState } from "react";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// import jwt from "jsonwebtoken";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  let history = useHistory();

  // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
  function register() {
    const url = `http://131.181.190.87:3000/user/register`;
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
          console.log(res);
        } else {
          // console.log(jwt.decode(res.token));
          localStorage.setItem("token", JSON.stringify(res.token));
          history.push("/login");
        }
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const togglePasswordFunc = () => {
    setTogglePassword(!togglePassword);
  };

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        className="login-form"
        style={styles.loginForm}
      >
        <h1>
          <div
            className="span font-weight-bold"
            style={{
              textAlign: "center",
              position: "relative",
              // top: 0,
              bottom: 10,
              color: "LightBlue",
              fontSize: 50,
            }}
          >
            Create Account
          </div>
        </h1>
        <p style={{ fontSize: 14 }}>
          Your email address will be your username and the one we use to contact
          you.
        </p>
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
            placeholder={"password"}
            onChange={handlePassword}
            value={password}
          />
          <FontAwesomeIcon
            icon={togglePassword ? faEyeSlash : faEye}
            style={styles.passwordIcon}
            onClick={togglePasswordFunc}
          />
        </FormGroup>

        <Button onClick={register} className="btn-lg btn-secondary btn-block">
          Signin
        </Button>
        <Button
          onClick={() => {
            history.push("/login");
          }}
          className="btn-lg btn-warning btn-secondary btn-block"
        >
          Back
        </Button>
      </Form>
    </div>
  );
};

export default RegisterScreen;

const styles = {
  loginForm: {
    width: "45%",
    maxwidth: "30px",
    margin: "auto",
    height: 100,
    padding: "4em",
  },
  passwordIcon: {
    position: "absolute",
    bottom: 20,
    right: 8,
  },
};
