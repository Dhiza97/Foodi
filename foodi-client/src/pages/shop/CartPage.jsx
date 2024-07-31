import React, { useContext, useState } from "react";
import UseCart from "../../hooks/UseCart";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";

const CartPage = () => {
  const [cart, refetch] = UseCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([])

  // Calculate price
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  }

  // Handle decrease function
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`http://localhost:8080/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem._id === item._id) {
            return {
             ...cartItem,
              quantity: cartItem.quantity - 1,
            };
          }
          return cartItem;
        })
        refetch()
        setCartItems(updatedCart);
      })
      refetch()
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Item can't be zero",
        showConfirmButton: false,
        timer: 1500,
        toast:true,
      });      
    }
  };

  // Handle increase function
  const handleIncrease = (item) => {
    // console.log(item._id)
    fetch(`http://localhost:8080/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
    .then((res) => res.json())
    .then((data) => {
      const updatedCart = cartItems.map((cartItem) => {
        if (cartItem._id === item._id) {
          return {
           ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        }
        return cartItem;
      })
      refetch()
      setCartItems(updatedCart);
    })
    refetch()
  }

  // Calculate total price
  const cartSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0)

  const orderTotal = cartSubTotal

  // Handle delete function
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your item has been deleted.", "success");
              refetch();
            } else {
              Swal.fire({
                title: "Error",
                text: "Failed to delete item.",
                icon: "error",
              });
            }
          });
      }
    });
  };

  return (
    <div className="section-container">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col justify-center items-center gap-8">
          <div className="space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug text-black">
              Items Added to The
              <span className="text-green"> Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Cart table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table border-separate border-spacing-0">
            {/* head */}
            <thead className="bg-green text-white">
              <tr className="border-none">
                <th className="border-none">#</th>
                <th className="border-none">Food</th>
                <th className="border-none">Item Name</th>
                <th className="border-none">Quantity</th>
                <th className="border-none">Price</th>
                <th className="border-none">Action</th>
              </tr>
            </thead>
            <tbody className="text-secondary">
              {/* row 1 */}
              {cart.map((item, index) => (
                <tr key={index} className="border-none">
                  <td className="border-none">{index + 1}</td>
                  <td className="border-none">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.image} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="border-none font-medium">{item.name}</td>
                  <td className="border-none ">
                    <button
                      className="btn btn-xs bg-transparent border-none hover:bg-gray-300"
                      onClick={() => handleDecrease(item)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={console.log(item.quantity)}
                      className="bg-transparent w-10 mx-2 text-center overflow-hidden appearance-none"
                    />
                    <button
                      className="btn btn-xs bg-transparent border-none hover:bg-gray-300"
                      onClick={() => handleIncrease(item)}
                    >
                      +
                    </button>
                  </td>
                  <td className="border-none">${calculatePrice(item).toFixed(2)}</td>
                  <th className="border-none">
                    <button
                      className="btn btn-ghost btn-xs text-red"
                      onClick={() => handleDelete(item)}
                    >
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer details */}
      <div className="my-12 flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium text-black">Customer Details</h3>
          <p className="text-secondary">Name: {user.displayName}</p>
          <p className="text-secondary">Email: {user.email}</p>
          <p className="text-secondary">User_id: {user.uid}</p>
        </div>

        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium text-black">Shopping Details</h3>
          <p className="text-secondary">Total Items: {cart.length}</p>
          <p className="text-secondary">Total Price: ${orderTotal.toFixed(2)}</p>
          <button className="btn bg-green text-white border-none">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
