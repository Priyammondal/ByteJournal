import React, { useState } from "react";
import "./index.scss";
import registrationImg from "../../assets/registration-login/registration.svg";
import Logo from "../../assets/logo/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const index = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("https://byte-journal.vercel.app/registration", {
      name: `${firstName} ${lastName}`,
      username,
      email,
      password,
    });
    if (response.status === 200) {
      navigate("/login");
      setFirstName("");
      setLastName("");
      setUsername("");
      setEmail("");
      setPassword("");
    } else {
      console.log("Registration Error Response--->", response.data.message);
    }
  };
  return (
    <div className="signup vh-100 vw-100 d-flex row p-0 m-0 mx-auto">
      <aside className="image-section col-12 col-lg-6">
        <img src={registrationImg} alt="registrationImg" />
      </aside>
      <section className="form-section col-12 col-lg-6">
        <Link to="/" className="logo">
          <h3 className="m-0 logo-txt">ByteJournal</h3>
          <img className="logo-img" src={Logo} alt="ByteJournal logo" />
        </Link>
        <form
          className="registration-form px-3 px-md-5 py-4"
          onSubmit={handleSubmit}
        >
          <h2>Signup</h2>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            className="form-control"
            placeholder="Enter your lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="text"
            className="form-control"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            className="form-control"
            placeholder="Enter your email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn registration-btn">Signup</button>
          <p className="text-center">
            Have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default index;
