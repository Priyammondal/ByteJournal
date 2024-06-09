import React, { useEffect, useState } from "react";
import "./index.scss";
import { FaUserEdit } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../redux/reducers";

const index = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.globalState.userInfo);
  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const fullName = userData.name || "";
  const userName = userData.username || "";
  const userEmail = userData.email || "";
  const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
  const { editProfileDetails, editPassoword } = api();

  const profileEditSchema = yup.object().shape({
    fullName: yup
      .string()
      .required("Required")
      .min(5, "Full Name must be at least 5 characters long"),
    userName: yup
      .string()
      .required("Required")
      .min(3, "Username must be at least 3 characters long"),
  });

  const passwordChangeSchema = yup.object().shape({
    userCurrentPassword: yup.string().required("Required"),
    userNewPassword: yup
      .string()
      .required("Required")
      .matches(passwordRules, "Please create a stronger password")
      .test(
        "not-same-as-current",
        "New password must be different from the current password",
        function (value) {
          return value !== this.parent.userCurrentPassword;
        }
      ),
  });

  const profileForm = useForm({
    resolver: yupResolver(profileEditSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const passwordForm = useForm({
    resolver: yupResolver(passwordChangeSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleProfileSubmit = async (data) => {
    const response = await editProfileDetails(data);
    if (response.data.message === "Profile updated successfully") {
      toast.success(response.data.message);
      localStorage.setItem("name", response.data.user.name);
      localStorage.setItem("username", response.data.user.username);
      dispatch(
        setUserInfo({
          ...userData,
          name: response.data.user.name,
          username: response.data.user.username,
        })
      );
      const newUserData = {
        ...JSON.parse(localStorage.getItem("userData")),
        name: response.data.user.name,
        username: response.data.user.username,
      };
      localStorage.setItem("userData", JSON.stringify(newUserData));
      setEditProfile(false);
    } else {
      toast.error(response.data.message);
    }
  };

  const handlePasswordSubmit = async (data) => {
    const response = await editPassoword({ ...data, userEmail });
    if (response.data.message === "Password updated successfully") {
      toast.success(response.data.message);
      setChangePassword(false);
    } else {
      toast.error(response.data.message);
      passwordForm.reset();
    }
  };
  useEffect(() => {
    profileForm.setValue("fullName", fullName);
    profileForm.setValue("userName", userName);
    profileForm.setValue("userEmail", userEmail);
  }, [fullName, userName, userEmail, profileForm.setValue]);

  return (
    <div className="profile container mx-auto my-2 px-lg-5">
      <section className="edit-profile rounded py-4 px-3 px-lg-4 mt-5">
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
            onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
            className="profile-info d-flex flex-column gap-3 fw-bold fs-6"
          >
            <div>
              <label htmlFor="fullname">Full Name</label>
              <input
                className="form-control"
                id="fullname"
                type="text"
                {...profileForm.register("fullName")}
              />
              {profileForm.formState.errors.fullName && (
                <p className="text text-danger">
                  {profileForm.formState.errors.fullName?.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                className="form-control"
                id="username"
                type="text"
                {...profileForm.register("userName")}
              />
              {profileForm.formState.errors.userName && (
                <p className="text text-danger">
                  {profileForm.formState.errors.userName?.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email">Email Address</label>
              <input
                className="form-control notAllowed"
                type="email"
                id="email"
                value={userEmail}
                readOnly
              />
            </div>

            <button
              className="btn btn-success update-btn w-25 mx-auto"
              title="Feature Currently Not Available"
            >
              Update
            </button>
          </form>
        ) : (
          <section className="profile-info d-flex flex-column gap-3 fw-bold fs-6">
            <div>
              <label htmlFor="">Full Name</label>
              <div>{fullName}</div>
            </div>
            <div>
              <label htmlFor="">Username</label>
              <div>{userName}</div>
            </div>

            <div>
              <label htmlFor="">Email Address</label>
              <div>{userEmail}</div>
            </div>
          </section>
        )}
      </section>

      <section className="change-password rounded py-4 px-3 px-lg-4 mt-4">
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
            onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
            className="edit-password-info d-flex flex-column gap-3 fw-bold fs-6"
          >
            <div>
              <label htmlFor="currentPassword">Current Password</label>
              <input
                className="form-control"
                type="password"
                id="currentPassword"
                {...passwordForm.register("userCurrentPassword")}
                placeholder="Enter Current Password"
              />
              {passwordForm.formState.errors.userCurrentPassword &&
                (passwordForm.formState.errors.userCurrentPassword?.message ===
                "Please create a stronger password" ? (
                  <span
                    class="d-inline-block"
                    tabindex="0"
                    data-bs-toggle="tooltip"
                    title="
                      Contain at least one digit (0-9).
Contain at least one lowercase letter (a-z).
Contain at least one uppercase letter (A-Z).
Be at least 5 characters long."
                  >
                    <p className="text text-danger">
                      {
                        passwordForm.formState.errors.userCurrentPassword
                          ?.message
                      }
                    </p>
                  </span>
                ) : (
                  <p className="text text-danger">
                    {passwordForm.formState.errors.userCurrentPassword?.message}
                  </p>
                ))}
            </div>
            <div>
              <label htmlFor="newPassword">New Password</label>
              <input
                className="form-control"
                type="password"
                id="newPassword"
                {...passwordForm.register("userNewPassword")}
                placeholder="Enter New Password"
              />

              {passwordForm.formState.errors.userNewPassword &&
                (passwordForm.formState.errors.userNewPassword?.message ===
                "Please create a stronger password" ? (
                  <span
                    class="d-inline-block"
                    tabindex="0"
                    data-bs-toggle="tooltip"
                    title="
                      Contain at least one digit (0-9).
Contain at least one lowercase letter (a-z).
Contain at least one uppercase letter (A-Z).
Be at least 5 characters long."
                  >
                    <p className="text text-danger">
                      {passwordForm.formState.errors.userNewPassword?.message}
                    </p>
                  </span>
                ) : (
                  <p className="text text-danger">
                    {passwordForm.formState.errors.userCurrentPassword?.message}
                  </p>
                ))}
            </div>
            <button
              className="btn btn-success update-btn w-25 mx-auto"
              title="Feature Currently Not Available"
            >
              Update
            </button>
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
