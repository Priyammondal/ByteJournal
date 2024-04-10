import React, { useState } from "react";
import "./index.scss";
import { FaUserEdit } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const index = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const userName = localStorage.getItem("name")
  const userEmail = localStorage.getItem("email")

  const handleEditProfile = (e) => {
    e.preventDefault();
  };

  const handleEditPassword = (e) => {
    e.preventDefault();
  };

  return (
    <div className="profile container mx-auto my-2 p-3 p-md-0">
      <section className="edit-profile rounded py-4 px-3 px-lg-5 mt-5">
        <span className="d-flex align-items-center justify-content-center gap-2 my-3">
          <h2 className="m-0">Edit Profile</h2>{" "}
          <FaUserEdit
            size={30}
            className="editProfile-btn"
            onClick={() => setEditProfile((prev) => !prev)}
          />
        </span>
        {editProfile ? (
          <form
            onSubmit={handleEditProfile}
            className="profile-info d-flex flex-column gap-3 fw-bold fs-6"
          >
            <div>
              <label htmlFor="fullname">Full Name</label>
              <input
                className="form-control"
                id="fullname"
                name="fullname"
                type="text"
                value={userName}
              />
            </div>
            
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                value={userEmail}
              />
            </div>
            <button className="btn btn-success">Update</button>
          </form>
        ) : (
          <section className="profile-info d-flex flex-column gap-3 fw-bold fs-6">
            <div>
              <label htmlFor="">Full Name</label>
              <div>{userName}</div>
            </div>
            
            <div>
              <label htmlFor="">Email Address</label>
              <div>{userEmail}</div>
            </div>
          </section>
        )}
      </section>
      <section className="change-password rounded py-4 px-3 px-lg-5 mt-5">
        <span className="d-flex align-items-center justify-content-center gap-2 my-3">
          <h2 className="m-0">Change Password</h2>{" "}
          <MdEdit
            size={30}
            className="editPassword-btn"
            onClick={() => setChangePassword((prev) => !prev)}
          />
        </span>
        {changePassword ? (
          <form
            onSubmit={handleEditPassword}
            className="edit-password-info d-flex flex-column gap-3 fw-bold fs-6"
          >
            <div>
              <label htmlFor="currentPswd">Current Password</label>
              <input
                className="form-control"
                id="currentPswd"
                name="currentPswd"
                type="password"
                value={"******"}
              />
            </div>
            <div>
              <label htmlFor="newPswd">New Password</label>
              <input
                className="form-control"
                id="newPswd"
                name="newPswd"
                type="password"
                value={"******"}
              />
            </div>
            <button className="btn btn-success">Update</button>
            <p className="text-danger">Forgot Password?</p>
          </form>
        ) : (
          <section className="password-info d-flex flex-column gap-3 fw-bold fs-6">
            <div>
              <label htmlFor="">Current Password</label>
              <div className="text-muted">* * * * * *</div>
            </div>
          </section>
        )}
      </section>
    </div>
  );
};

export default index;
