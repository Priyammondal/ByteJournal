import React, { useEffect, useState } from "react";
import "./index.scss";
import loginImg from "../../assets/registration-login/login.svg";
import Logo from "../../assets/logo/logo.png";
import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setLoginState } from "../../redux/reducers";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(setLoginState(false));
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenType");
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5050/login", {
      email,
      password,
    });
    if (response.status === 200) {
      localStorage.setItem("userId", response.data.data[0]._id);
      localStorage.setItem("name", response.data.data[0].name);
      localStorage.setItem("username", response.data.data[0].username);
      localStorage.setItem("email", response.data.data[0].email);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("tokenType", response.data.type);
      navigate("/");
      setEmail("");
      setPassword("");
    } else {
      console.log(response);
      console.log("No user found!");
    }
    dispatch(setLoginState(true));
    navigate("/");
  };
  return (
    <div className="login vh-100 vw-100 d-flex row p-0 m-0 mx-auto">
      <aside className="image-section col-12 col-lg-6">
        <img src={loginImg} alt="loginImg" />
      </aside>
      <section className="form-section col-12 col-lg-6">
        <Link to="/" className="logo">
          <h3 className="m-0 logo-txt">ByteJournal</h3>
          <img className="logo-img" src={Logo} alt="ByteJournal logo" />
        </Link>
        <form className="login-form px-3 px-md-5 py-4" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
              <MdEmail />
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
              <FaLock />
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p>Forgot password?</p>
          <button className="btn login-btn">Login</button>
          <p className="text-center">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default index;
