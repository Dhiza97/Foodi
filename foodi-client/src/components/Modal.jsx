import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {signUpWithGmail, login} = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState("")

  // Redirecting to homepage or specific page
  const location = useLocation()
  const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/"

  const onSubmit = (data) => {
    const email = data.email
    const password = data.password
    // console.log(email, password)
    login(email, password).then((result) => {
      const user = result.user
      alert("Login successful")
      document.getElementById("my_modal_5").close()
      navigate(from, {replace: true})
    }).catch((error) => {
      const errorMessage = error.message
      setErrorMessage("Provide a correct email and password")
    })
  }

  // Google sign in
  const handleLogin = () => {
    signUpWithGmail().then((result) => {
      const user = result.user
      alert("Login successful")
      navigate(from, {replace: true})
    }).catch((error) => console.log(error))
  }

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box bg-white">
        <div className="modal-action flex flex-col justify-center mt-0 text-black">

          <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
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
                {...register("password")}
              />
              <label className="label mt-1">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Error text */}
            {
              errorMessage ? <p className="text-red text-xs italic">{errorMessage}</p> : ""
            }

            {/* Login button */}
            <div className="form-control mt-4">
              <input
                type="submit"
                className="btn bg-green border-none text-white"
                value="Login"
              />
            </div>
            <p className="text-center text-secondary my-2">
              Do not have an account?{" "}
              <Link to="/signup" className="underline text-red ml-1">
                Signup Now
              </Link>{" "}
            </p>

            <button
            htmlFor="my_modal_5"
            onClick={() => document.getElementById("my_modal_5").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >✕
            </button>
          </form>

          {/* Social sign in */}
          <div className="text-center space-x-3 mb-5">
            <button className="btn btn-circle bg-gray-200 text-secondary hover:bg-green hover:text-white border-none" onClick={handleLogin}>
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
