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
import api from "../../api";

const index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = api();

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
    const loginResponse = await login({ email, password });

    if (loginResponse.status === 200) {
      localStorage.setItem("userId", loginResponse.data.data[0]._id);
      localStorage.setItem("name", loginResponse.data.data[0].name);
      localStorage.setItem("username", loginResponse.data.data[0].username);
      localStorage.setItem("email", loginResponse.data.data[0].email);
      localStorage.setItem("token", loginResponse.data.token);
      localStorage.setItem("tokenType", loginResponse.data.type);
      navigate("/");
      setEmail("");
      setPassword("");
    } else if (loginResponse.status === 404) {
      alert(loginResponse.data.message);
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
