import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { PiSmileySad, PiSmileySadFill } from "react-icons/pi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { CgDetailsMore } from "react-icons/cg";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const index = ({ user, article, edit, dlt }) => {
  console.log("article-->", article);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const tokenType = localStorage.getItem("tokenType");

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
        location.pathname === "/myarticles" && window.location.reload();
      }
    } catch (error) {
      console.log("delteArticle error->", error);
      navigate("/login");
    }
  };

  const handleLikeDislike = async (articleId, action) => {
    if (user._id === userId) {
      alert("You can't like/dislike your own article!");
      return;
    }
    try {
      const result = await axios.post(
        "http://localhost:5050/articles/like-dislike",
        {
          articleId,
          userId,
          action,
        },
        {
          headers: {
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      if (result.data.message === "Action performed successfully") {
        window.location.reload();
      } else {
        alert(result.data.message);
      }
    } catch (error) {
      console.log("like-dislike error-->", error);
    }
  };

  return (
    <div className="col-12 col-lg-6 col-xl-3 col-xxl-4 mb-5">
      <div
        className="card mx-auto"
        style={{ width: "90%", minHeight: "250px" }}
      >
        {/* <img src="..." className="card-img-top" alt="..." /> */}
        <div className="card-body d-flex flex-column justify-content-between">
          <section>
            <h5 className="card-title">{article?.title}</h5>
            <p className="card-text">{article?.content}</p>
          </section>
          <section className="d-flex justify-content-between">
            <div className="d-flex gap-2 align-items-center">
              {article.likedBy.includes(userId) ? (
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
              {article.dislikedBy.includes(userId) ? (
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
