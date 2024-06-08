import React, { useEffect, useState } from "react";
import "./index.scss";
import { useLocation } from "react-router-dom";

const index = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <div className="footer p-5">
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
      {visible && (
        <img
          className="scrollUp"
          src="https://media.tenor.com/jmfd-u6R5zMAAAAM/up-arrow.gif"
          alt="scroll to top"
          onClick={scrollToTop}
        />
      )}
    </div>
  );
};

export default index;
