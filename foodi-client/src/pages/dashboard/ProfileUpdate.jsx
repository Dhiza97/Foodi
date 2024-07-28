import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileUpdate = () => {
  const { updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || "/"

  const onSubmit = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;
    updateUserProfile({ name, photoURL }).then(() => {
      navigate(from, {replace: true});
    }).catch(() => {
      alert("Failed to update profile");
    })
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="font-bold text-lg text-black">Update Profile</h1>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-secondary">Name</span>
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="your name"
              className="input input-bordered bg-white"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-secondary">Upload Photo</span>
            </label>
            <input
              type="text"
              {...register("photoURL")}
              placeholder="photoURL"
              className="input input-bordered bg-white"
              required
            />

            {/* uploading image will be later */}
            {/* <input type="file" className="file-input w-full max-w-xs bg-white" /> */}
          </div>

          <div className="form-control mt-6">
            <button className="btn bg-green text-white border-none">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
