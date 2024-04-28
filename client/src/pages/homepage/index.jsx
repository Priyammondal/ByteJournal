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
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    const articleResponseData = await getAllArticles();
    if (articleResponseData.status === 200) {
      setAllData(articleResponseData.data);
      dispatch(setUserArticleData(articleResponseData.data));
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    } else navigate("/login");
  };

  return loader ? (
    <div className="bg-secondary vh-100 w-100 d-flex align-items-center justify-content-center">
      <div className="loader"></div>
    </div>
  ) : (
    <div className="home py-5 bg-secondary">
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
