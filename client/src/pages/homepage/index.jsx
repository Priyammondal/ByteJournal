import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { useDispatch } from "react-redux";
import { setUserArticleData } from "../../redux/reducers";
import Card from "../../components/Card";
import api from "../../api";

const Home = () => {
  const [allData, setAllData] = useState([]);
  const dispatch = useDispatch();
  const { getAllArticles } = api();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const articleResponseData = await getAllArticles();
    if (articleResponseData.status === 200) {
      setAllData(articleResponseData.data);
      dispatch(setUserArticleData(articleResponseData.data));
    } else navigate("/login");
  };


  return (
    <div className="home bg-info py-5">
      <section className="d-flex flex-wrap container">
        {allData?.map((user, index) =>
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
