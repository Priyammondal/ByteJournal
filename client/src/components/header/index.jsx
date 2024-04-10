import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { IoNotificationsOutline } from "react-icons/io5";
import { SlNote } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { IoPersonCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setLoginState } from "../../redux/reducers";
import axios from "axios";

const index = () => {
  const [profileExpand, setprofileExpand] = useState(false);
  const loginRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.globalState);
  useEffect(() => {
    const handleClick = (e) => {
      if (loginRef.current && !loginRef.current.contains(e.target)) {
        setprofileExpand(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [loginRef]);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = localStorage.getItem("token");
    const tokenType = localStorage.getItem("tokenType");
    const loginStatus = await axios.get(`http://localhost:5050/loginstatus`, {
      headers: {
        Authorization: `${tokenType} ${token}`,
      },
    });
    if (loginStatus.status === 200) {
      dispatch(setLoginState(true));
    }
  };

  const handleLogout = () => {
    if (window.innerWidth < 992 && element.classList.contains("show")) {
      element.classList.remove("show");
    }
    dispatch(setLoginState(false));
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("tokenType");
    navigate("/");
  };
  const element = document.getElementById("navbarNav");

  return (
    <div className="header bg-light shadow">
      <nav className="navbar navbar-expand-lg navbar-light px-1 px-lg-5 container">
        <section className="navbar-flex navbar-brand logo d-flex justify-content-center align-items-center">
          <Link
            to="/"
            className="d-flex align-items-center justify-content-center"
          >
            <h4 className="m-0 logo-text">ByteJournal</h4>
            <img src={Logo} alt="ByteJournal logo" />
          </Link>
        </section>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto d-flex gap-4 align-items-center ms-auto">
            {globalState.login ? (
              <>
                <li
                  className="nav-item contact me-auto"
                  onClick={() => {
                    if (
                      window.innerWidth < 992 &&
                      element.classList.contains("show")
                    ) {
                      element.classList.remove("show");
                    }
                    navigate("/new-article");
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <SlNote size={18} /> Write
                  </div>
                </li>

                {/* <li className="nav-item support me-auto">
                  <div className="d-flex align-items-center gap-2">
                    <IoNotificationsOutline size={20} />
                  </div>
                </li> */}

                <li className="login" ref={loginRef}>
                  <Link
                    className="d-flex align-items-center gap-2"
                    onClick={() => setprofileExpand(true)}
                  >
                    <IoPersonCircle size={20} />
                    Welcome, {localStorage.getItem("username")}
                  </Link>
                  {profileExpand && (
                    <section className="profile-dropdown">
                      <ul className="list-group">
                        <li
                          className="list-group-item list-group-item-action"
                          onClick={() => {
                            if (
                              window.innerWidth < 992 &&
                              element.classList.contains("show")
                            ) {
                              element.classList.remove("show");
                            }
                            navigate("/profile");
                            setprofileExpand(false);
                          }}
                        >
                          My Profile
                        </li>
                        <li
                          className="list-group-item list-group-item-action"
                          onClick={() => {
                            if (
                              window.innerWidth < 992 &&
                              element.classList.contains("show")
                            ) {
                              element.classList.remove("show");
                            }
                            navigate("/myarticles");
                            setprofileExpand(false);
                          }}
                        >
                          My Articles
                        </li>
                        <li
                          className="list-group-item list-group-item-action"
                          onClick={handleLogout}
                        >
                          Logout
                        </li>
                      </ul>
                    </section>
                  )}
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="d-flex align-items-center gap-2">
                  <CgProfile size={17} />
                  Login / Signup
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default index;