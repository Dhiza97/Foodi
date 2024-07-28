import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider"; // Ensure this is the correct import path

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, login } = useContext(AuthContext); // Ensure AuthContext is being used correctly

  // Redirecting to homepage or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        // Signed up
        const user = result.user;
        alert("User created successfully");
        document.getElementById("my_modal_5").close();
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Signup error:", errorCode, errorMessage);
      });
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="modal-action flex flex-col justify-center mt-0 text-black">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg">Create An Account</h3>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered bg-white"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered bg-white"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          {/* Error text */}

          {/* Login button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              className="btn bg-green border-none text-white"
              value="Sign Up"
            />
          </div>
          <p className="text-center text-secondary my-2">
            Have an account?{" "}
            <button
              className="underline text-red ml-1"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Login
            </button>{" "}
          </p>

          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>

        {/* Social sign in */}
        <div className="text-center space-x-3 mb-5">
          <button className="btn btn-circle bg-gray-200 text-secondary hover:bg-green hover:text-white border-none">
            <FaGoogle />
          </button>

          <button className="btn btn-circle bg-gray-200 text-secondary hover:bg-green hover:text-white border-none">
            <FaFacebookF />
          </button>

          <button className="btn btn-circle bg-gray-200 text-secondary hover:bg-green hover:text-white border-none">
            <FaGithub />
          </button>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default Signup;