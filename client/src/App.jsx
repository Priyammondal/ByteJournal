import "./App.css";
import Signup from "./pages/signup";
import Login from "./pages/login";
import MyArticles from "./pages/myArticles";
import EditMyArticles from "./pages/editMyArticles";
import Home from "./pages/homepage";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import NewArticle from "./pages/newArticle";
import ArticleDetails from "./pages/articleDetails";
import Profile from "./pages/profile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./redux/reducers";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("userData")) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      dispatch(setUserInfo(userData));
    }
  }, []);
  const location = useLocation();
  const pathsWithoutHeaderFooter = ["/login", "/signup"];
  return (
    <>
      {!pathsWithoutHeaderFooter.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myarticles" element={<MyArticles />} />
        <Route path="/:articlename/:id" element={<ArticleDetails />} />
        <Route path="/myarticles/edit/:id" element={<EditMyArticles />} />
        <Route path="/new-article" element={<NewArticle />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="*"
          element={
            <div
              style={{
                background: "papayawhip",
                height: "100vh",
                display: "grid",
                placeItems: "center",
                color: "red",
                width: "100vw",
              }}
            >
              <h1>Wrong URL!</h1>
            </div>
          }
        />
      </Routes>
      {!pathsWithoutHeaderFooter.includes(location.pathname) && <Footer />}
    </>
  );
}

export default App;
