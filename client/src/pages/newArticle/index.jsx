import React, { useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const NewArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const { createArticle } = api();

  const handleSubmitArticle = async (e) => {
    e.preventDefault();
    if (title && content) {
      const createArticleResponse = await createArticle({
        title: title,
        content: content,
        username: username,
      });
      if (createArticleResponse.status === 200) {
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

export default NewArticle;
