import React from "react";
import "./index.scss";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { PiSmileySad, PiSmileySadFill } from "react-icons/pi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { CgDetailsMore } from "react-icons/cg";
import { useNavigate, useLocation } from "react-router-dom";
import parse from "html-react-parser";
import api from "../../api";

const index = ({ user, article, edit, dlt }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const { deleteArticle, articleLikeDislike } = api();

  const handleDelete = async (id) => {
    const deleteResponse = await deleteArticle(id);
    if (deleteResponse.status === 200) {
      location.pathname === "/myarticles" && window.location.reload();
    }
  };

  const handleLikeDislike = async (articleId, action) => {
    if (user._id === userId) {
      alert("You can't like/dislike your own article!");
      return;
    } else {
      const likeDislikeResponse = await articleLikeDislike({
        articleId,
        userId,
        action,
      });
      if (likeDislikeResponse) {
        if (
          likeDislikeResponse.data.message === "Action performed successfully"
        ) {
          window.location.reload();
        } else {
          alert(likeDislikeResponse.data.message);
        }
      }
    }
  };

  return (
    <div className="col-12 mb-2">
      <div className="card mx-auto">
        <div className="card-body d-flex flex-column justify-content-between">
          <section className="w-100">
            <h5 className="card-title">{article?.title}</h5>
            <p className="card-text">{parse(article?.content)}</p>
          </section>
          <section className="d-flex justify-content-between w-100">
            <div className="d-flex gap-2 align-items-center">
              {userId && article.likedBy.includes(userId) ? (
                <GoHeartFill
                  size={25}
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleLikeDislike(article._id, "like")}
                />
              ) : (
                <GoHeart
                  size={25}
                  style={{ color: "silver", cursor: "pointer" }}
                  onClick={() => handleLikeDislike(article._id, "like")}
                />
              )}
              {article.likeCount}
              {userId && article.dislikedBy.includes(userId) ? (
                <PiSmileySadFill
                  size={26}
                  style={{ color: "yellow", cursor: "pointer" }}
                  onClick={() => handleLikeDislike(article._id, "dislike")}
                />
              ) : (
                <PiSmileySad
                  size={26}
                  style={{ color: "silver", cursor: "pointer" }}
                  onClick={() => handleLikeDislike(article._id, "dislike")}
                />
              )}
              {article.dislikeCount}
            </div>
            <div className="d-flex gap-1 align-items-center">
              {edit && (
                <FaEdit
                  className="me-2"
                  size={25}
                  style={{ color: "", cursor: "pointer" }}
                  onClick={() => navigate(`/myarticles/edit/${article._id}`)}
                />
              )}
              {dlt && (
                <MdDeleteForever
                  onClick={() => handleDelete(article._id)}
                  size={28}
                  style={{ color: "red", cursor: "pointer" }}
                />
              )}
              <CgDetailsMore
                size={30}
                style={{ color: "grey", cursor: "pointer" }}
                onClick={() =>
                  navigate(
                    `/${article.title.split(" ").join("-")}/${article._id}`
                  )
                }
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default index;
