import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <div className="footer my-5 container">
      <div className="footer-copyright text-center">
        <h5>Made with 💜 and React</h5>
        <h6>
          © Copyright {new Date().getFullYear()},{" "}
          <a
            className="text-black text-decoration-none"
            href="https://priyammondal.github.io/portfolio/"
            target="blank"
          >
            Priyam Mondal
          </a>{" "}
          All rights reserved
        </h6>
      </div>
    </div>
  );
};

export default index;
