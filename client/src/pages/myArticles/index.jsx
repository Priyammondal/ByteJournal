import { useEffect, useState } from "react";
import "./index.scss";
import Card from "../../components/Card";
import api from "../../api";

const MyArtilces = () => {
  const [myArticles, setMyArticles] = useState([]);
  const username = localStorage.getItem("username");
  const { getArticleByUsername } = api();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const articleResponse = await getArticleByUsername(username);
    if (articleResponse.status === 200) {
      setMyArticles(articleResponse.data);
    }
  };

  return (
    <div className="myarticles bg-info py-5">
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
