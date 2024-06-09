import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const api = () => {
  axios.defaults.withCredentials = true;
  const token = localStorage.getItem("token");
  const tokenType = localStorage.getItem("tokenType");
  const baseUrl = "https://byte-journal.vercel.app";
  // const baseUrl = "http://localhost:5050";
  const navigate = useNavigate();
  const location = useLocation();

  const checkLoginStatus = async (articlename) => {
    try {
      const loginStatus = await axios.get(`${baseUrl}/loginstatus`, {
        headers: {
          Authorization: `${tokenType} ${token}`,
        },
      });
      return loginStatus;
    } catch (err) {
      console.log("error -> ", err);
      if (
        location.pathname !== "/" &&
        err.response.data.error === "Unauthorized Access" &&
        articlename === undefined
      ) {
        navigate("/login");
      }
    }
  };

  const login = async (data) => {
    try {
      const loginResponse = await axios.post(`${baseUrl}/login`, {
        ...data,
      });
      return loginResponse;
    } catch (err) {
      console.log("error -> ", err);
      navigate("/login");
    }
  };

  const registration = async (data) => {
    try {
      const registrationResponse = await axios.post(`${baseUrl}/registration`, {
        ...data,
      });
      return registrationResponse;
    } catch (err) {
      console.log("error -> ", err);
      // navigate("/login");
    }
  };

  const getAllArticles = async () => {
    try {
      const articleResponse = await axios.get(`${baseUrl}/getArticles`);
      return articleResponse;
    } catch (err) {
      console.log("error -> ", err);
      navigate("/login");
    }
  };

  const getArticleById = async (id) => {
    try {
      const articleByIdResponse = await axios.get(
        `${baseUrl}/getArticle/${id}`,
        {
          headers: {
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      return articleByIdResponse;
    } catch (err) {
      console.log("error -> ", err);
      navigate("/login");
    }
  };

  const getArticleByUsername = async (username) => {
    try {
      const articleResponse = await axios.get(
        `${baseUrl}/getArticles/${username}`,
        {
          headers: {
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      return articleResponse;
    } catch (err) {
      console.log("error -> ", err);
      navigate("/login");
    }
  };

  const createArticle = async (data) => {
    try {
      const createArticleResponse = await axios.post(
        `${baseUrl}/createArtilcle`,
        { ...data },
        {
          headers: {
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      return createArticleResponse;
    } catch (err) {
      console.log("error -> ", err);
      navigate("/login");
    }
  };

  const editArticle = async (id, data) => {
    try {
      const editResponse = await axios.put(
        `${baseUrl}/editArticle/${id}`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      return editResponse;
    } catch (err) {
      console.log("error -> ", err);
      navigate("/login");
    }
  };

  const deleteArticle = async (id) => {
    try {
      const deleteResponse = await axios.delete(
        `${baseUrl}/deleteArticle/${id}`,
        {
          headers: {
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      return deleteResponse;
    } catch (err) {
      console.log("error -> ", err);
      navigate("/login");
    }
  };

  const articleLikeDislike = async (data) => {
    try {
      const likeDislikeResponse = await axios.post(
        `${baseUrl}/articles/like-dislike`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      return likeDislikeResponse;
    } catch (err) {
      console.log("error -> ", err);
      navigate("/login");
    }
  };

  const editProfileDetails = async (data) => {
    try {
      const editProfileResponse = await axios.post(
        `${baseUrl}/editProfile`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      return editProfileResponse;
    } catch (err) {
      console.log("error edit profile -> ", err);
      navigate("/login");
    }
  };

  const editPassoword = async (data) => {
    try {
      const editPasswordRes = await axios.post(
        `${baseUrl}/editPassword`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `${tokenType} ${token}`,
          },
        }
      );
      return editPasswordRes;
    } catch (err) {
      console.log("error edit profile -> ", err);
      navigate("/login");
    }
  };
  return {
    checkLoginStatus,
    login,
    registration,
    getAllArticles,
    getArticleById,
    getArticleByUsername,
    createArticle,
    editArticle,
    deleteArticle,
    articleLikeDislike,
    editProfileDetails,
    editPassoword,
  };
};

export default api;
