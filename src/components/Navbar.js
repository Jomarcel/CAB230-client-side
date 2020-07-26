import React, { useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import * as moment from "moment";
import "../../src/App.css";
// import "../";
const Navbar = () => {
  let history = useHistory();

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    history.push(`/`);
  };
  const [currentDate, setCurrentDate] = useState(
    moment(new Date()).format("MMMM Do YYYY, h:mm:ss a").toString()
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(
        moment(new Date()).format("MMMM Do YYYY, h:mm:ss a").toString()
      );
    }, 1000);
    return () => clearInterval(interval); //clear interval when component unmounts
  }, []);
  return (
    <nav
      style={{ position: "sticky", top: 0, zIndex: 6 }}
      className="nav-wrapper light-black darken-3"
    >
      <div className="container">
        <h1
          style={{
            position: "absolute",
            // bottom: 0,
            right: 0,
            top: 0,
            width: 100,
            backgroundColor: "",
            fontSize: 12,
          }}
        >
          {currentDate}
        </h1>
        <Link className="brand-logo center" to="/">
          <img
            style={{ height: 80 }}
            src="https://www.graphicsprings.com/filestorage/stencils/ae89bc21bca5fc3d223cbd995d0762fb.png?width=500&height=500"
            alt=""
          />
        </Link>
        <ul className="left">
          <li>
            <NavLink
              activeStyle={styles.navActive}
              style={{ textDecoration: "none" }}
              exact
              to="/"
            >
              Home
            </NavLink>
          </li>
        </ul>
        <ul className="right" style={{ position: "relative", right: 50 }}>
          <li>
            <NavLink to="/login" style={styles.navLinks}>
              {!localStorage.getItem("token") ? (
                <Button style={{ backgroundColor: "lightblue" }}>login</Button>
              ) : null}
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" style={styles.navLinks}>
              {!localStorage.getItem("token") ? (
                <Button style={{ backgroundColor: "lightblue" }}>signup</Button>
              ) : null}
            </NavLink>
          </li>
          <li>
            {localStorage.getItem("token") ? (
              <Button style={{ backgroundColor: "lightblue" }} onClick={logOut}>
                Logout
              </Button>
            ) : null}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

const styles = {
  navActive: {
    backgroundColor: "orange",
    WebkitTextDecorationStyle: "none",
  },
  navLinks: {
    textDecoration: "none",
  },
};
