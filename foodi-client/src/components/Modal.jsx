import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";

const Modal = () => {
  const { signUpWithGmail, login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  // Redirecting to homepage or specific page
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        const userInfor = {
          name: data.name,
          email: data.email,
        };
        axios
          .post("http://localhost:6001/users", userInfor)
          .then((response) => {
            // console.log(response);
            alert("Signin successful!");
            navigate(from, { replace: true });
          });
        // console.log(user);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        seterrorMessage("Please provide valid email & password!");
      });
    reset();
  };

  // Google sign in
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axios
          .post("http://localhost:6001/users", userInfor)
          .then((response) => {
            // console.log(response);
            alert("Signin successful!");
            navigate("/");
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box bg-white">
        <div className="modal-action flex flex-col justify-center mt-0 text-black">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-body"
            method="dialog"
          >
            <h3 className="font-bold text-lg">Please Login!</h3>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered bg-white"
                {...register("email")}
              />
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
                {...register("password", { required: true })}
              />
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Error text */}
            {errorMessage ? (
              <p className="text-red text-xs italic">
                Provide a correct username & password.
              </p>
            ) : (
              ""
            )}

            {/* Login button */}
            <div className="form-control mt-4">
              <input
                type="submit"
                className="btn bg-green border-none text-white"
                value="Login"
              />
            </div>

            {/* Close button */}
            <button
              htmlFor="my_modal_5"
              onClick={() => document.getElementById("my_modal_5").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>

            <p className="text-center text-secondary my-2">
              Do not have an account?{" "}
              <Link to="/signup" className="underline text-red ml-1">
                Signup Now
              </Link>{" "}
            </p>
          </form>

          {/* Social sign in */}
          <div className="text-center space-x-3 mb-5">
            <button
              className="btn btn-circle bg-gray-200 text-secondary hover:bg-green hover:text-white border-none"
              onClick={handleRegister}
            >
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
      </div>
    </dialog>
  );
};

export default Modal;
