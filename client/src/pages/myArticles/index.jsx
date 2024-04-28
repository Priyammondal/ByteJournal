import { useEffect, useState } from "react";
import "./index.scss";
import Card from "../../components/Card";
import api from "../../api";

const MyArtilces = () => {
  const [myArticles, setMyArticles] = useState([]);
  const username = localStorage.getItem("username");
  const { getArticleByUsername } = api();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const articleResponse = await getArticleByUsername(username);
    if (articleResponse.status === 200) {
      setMyArticles(articleResponse.data);
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }
  };

  return loader ? (
    <div className="bg-secondary vh-100 w-100 d-flex align-items-center justify-content-center">
      <div className="loader"></div>
    </div>
  ) : (
    <div className="myarticles bg-secondary py-5">
      <section className="d-flex flex-wrap container">
        {myArticles[0]?.articles.length === 0 ? (
          <h3 className="text-danger mx-auto">No Articles found!</h3>
        ) : (
          myArticles.map((user) =>
            user.articles.map((article) => (
              <Card
                key={article._id}
                user={user}
                article={article}
                edit={true}
                dlt={true}
              />
            ))
          )
        )}
      </section>
    </div>
  );
};

export default MyArtilces;
