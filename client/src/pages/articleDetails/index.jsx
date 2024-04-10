import React, { useEffect, useState } from "react";
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ArticleDetails = () => {
  const [author, setAuthor] = useState({});
  const [article, setArticle] = useState({});
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const tokenType = localStorage.getItem("tokenType");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getArticleDetails();
  }, []);

  const getArticleDetails = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5050/getArticle/${params.id}`,
        {
          headers: {
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      if (result.status === 200) {
        setArticle(result.data.article);
        setAuthor(result.data.user);
      }
    } catch (err) {
      console.log("getArticleDetails error: ", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const delteResponse = await axios.delete(
        `http://localhost:5050/deleteArticle/${id}`,
        {
          headers: {
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      if (delteResponse.status === 200) {
        navigate(-1);
      }
    } catch (error) {
      console.log("deleteArticle error->", error);
      navigate("/login");
    }
  };

  return (
    <div className="article-details bg-info">
      <div className="createArticleMain container">
        <div className="artilceForm w-100 p-5">
          <div className="mb-3">
            <h1 className="text-uppercase">{article.title}</h1>
            <div className="edit-delete d-flex justify-content-between align-items-center">
              <h5>- {author.name}</h5>
              {author._id === userId && (
                <div>
                  <FaEdit
                    className="me-2"
                    size={25}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/myarticles/edit/${article._id}`)}
                  />
                  <MdDeleteForever
                    onClick={() => handleDelete(article._id)}
                    size={30}
                    color="red"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <p>{article.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
