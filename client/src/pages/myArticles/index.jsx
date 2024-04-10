import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.scss";
import Card from "../../components/Card";

const MyArtilces = () => {
  const navigate = useNavigate();
  const [myArticles, setMyArticles] = useState([]);

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const tokenType = localStorage.getItem("tokenType");

  useEffect(() => {
    getMyArticles();
  }, []);

  const getMyArticles = async () => {
    try {
      const articleResponse = await axios.get(
        `https://byte-journal.vercel.app/getArticles/${username}`,
        {
          headers: {
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      if (articleResponse.status === 200) {
        setMyArticles(articleResponse.data);
      }
    } catch (error) {
      console.log("myarticle error->", error);
      navigate("/login");
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
