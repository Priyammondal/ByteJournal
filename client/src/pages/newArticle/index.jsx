import React, { useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const tokenType = localStorage.getItem("tokenType");
  const navigate = useNavigate();

  const handleSubmitArticle = async (e) => {
    e.preventDefault();
    try {
      if (title && content) {
        const response = await axios.post(
          "http://localhost:5050/createArtilcle",
          { title: title, content: content, username: username },
          {
            headers: {
              Authorization: `${tokenType} ${token}`,
            },
          }
        );
        if (response.status === 200) {
          navigate("/myarticles");
        }
      }
    } catch (error) {
      console.log("newarticle error->", error);
      navigate("/login");
    }
  };

  return (
    <div className="create_article bg-info">
      <div className="createArticleMain container pt-5">
        <form
          className="artilceForm w-100 p-5"
          onSubmit={handleSubmitArticle}
        >
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
