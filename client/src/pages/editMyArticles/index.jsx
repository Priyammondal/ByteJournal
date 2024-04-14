import React, { useEffect, useState } from "react";
import "./index.scss";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

const EditMyArticles = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const { getArticleById, editArticle } = api();

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = async () => {
    const artilcleByIdResponse = await getArticleById(params.id);
    if (artilcleByIdResponse.status === 200) {
      setTitle(artilcleByIdResponse.data.article.title);
      setContent(artilcleByIdResponse.data.article.content);
    }
  };

  const handleSubmitArticle = async (e) => {
    e.preventDefault();
    if (title && content) {
      const editArticleResponse = await editArticle(params.id, {
        title: title,
        content: content,
      });
      if (editArticleResponse.status === 200) {
        navigate("/myarticles");
      }
    }
  };

  return (
    <div className="create_article bg-info">
      <div className="createArticleMain container pt-5">
        <form className="artilceForm w-100 p-5" onSubmit={handleSubmitArticle}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter Article Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Content:
            </label>
            <textarea
              className="form-control"
              id="content"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EditMyArticles;
