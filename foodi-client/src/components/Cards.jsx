import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;

  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  // Add to cart btn
  const handleAddToCart = (item) => {
    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };
  
      console.log("Adding to cart:", cartItem);
  
      fetch("http://localhost:6001/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => {
          if (!res.ok) {
            // Handle different HTTP error codes
            if (res.status === 409) {
              // Conflict: Item already in cart
              return res.json().then((data) => {
                Swal.fire({
                  icon: "warning",
                  title: "Item Already in Cart",
                  text: data.message,
                  showConfirmButton: false,
                  timer: 1500,
                  toast: true,
                  position: "top-end",
                  backdrop: true,
                });
              });
            } else {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
          }
          return res.json();
        })
        .then((data) => {
          console.log("Server response:", data);
          if (data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Item Added to Cart",
              showConfirmButton: false,
              timer: 1500,
              toast: true,
              backdrop: true,
            });
          }
        })
        .catch((error) => {
          console.error("Error adding item to cart:", error);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Failed to Add Item to Cart",
            text: error.message,
            showConfirmButton: true,
            timer: 2500,
            toast: true,
            backdrop: true,
          });
        });
    } else {
      Swal.fire({
        title: "Please Login",
        text: "You can't add a product without an account",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Signup Now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup", { state: { from: location } });
        }
      });
    }
  };

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  return (
    <div className="card bg-base-100 w-75 shadow-xl bg-white mr-4">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt=""
            className="hover:scale-105 transition-all duration-200 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title text-black">{item.name}</h2>
        </Link>
        <p className="text-secondary">Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$</span> {item.price}
          </h5>
          <button
            className="btn bg-green text-white border-none"
            onClick={() => handleAddToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
