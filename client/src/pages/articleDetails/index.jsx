import React, { useEffect, useState } from "react";
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import api from "../../api";

const ArticleDetails = () => {
  const [author, setAuthor] = useState({});
  const [article, setArticle] = useState({});
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const params = useParams();
  const { getArticleById, deleteArticle, checkLoginStatus } = api();

  useEffect(() => {
    checkLoginStatus(params.articlename);
    fetchArticlesById();
  }, []);

  const fetchArticlesById = async () => {
    const articleByIdResponse = await getArticleById(params.id);
    if (articleByIdResponse.status === 200) {
      setArticle(articleByIdResponse.data.article);
      setAuthor(articleByIdResponse.data.user);
    }
  };

  const handleDelete = async (id) => {
    const delteResponse = await deleteArticle(id);
    if (delteResponse.status === 200) {
      navigate(-1);
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
