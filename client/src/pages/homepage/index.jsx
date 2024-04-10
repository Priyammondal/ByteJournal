import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserArticleData } from "../../redux/reducers";
import Card from "../../components/Card";

const Home = () => {
  const [allData, setAllData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    getAllArticles();
  }, []);

  const getAllArticles = async () => {
    try {
      const response = await axios.get(
        `https://byte-journal.vercel.app/getArticles`
      );
      if (response.status === 200) {
        const data = await response.data;
        setAllData(data);
        dispatch(setUserArticleData(data));
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log("error-->", err);
      navigate("/login");
    }
  };
  return (
    <div className="home bg-info py-5">
      <section className="d-flex flex-wrap container">
        {allData.map((user, index) =>
          user.articles.map((article, articleIndex) => (
            <Card
              key={article._id}
              user={user}
              article={article}
              edit={false}
              dlt={false}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default Home;
