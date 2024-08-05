import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrashAlt, FaUsers } from "react-icons/fa";

const Users = () => {
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:6001/users`);
      return res.json();
    },
  });
  console.log(users);

  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5>All Users</h5>
        <h5>Total Users: {users.length}</h5>
      </div>

      {/* Table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className="bg-green text-white rounded-lg">
              <tr className="border-none">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="text-black border-none">
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role === "admin" ? "Admin" : 
                    <button className="btn btn-xs btn-circle bg-indigo-500 bg-white border-none hover:bg-gray-300">
                      <FaUsers/>
                      </button>}</td>
                  <td>
                    <button className="btn btn-xs text-red bg-white border-none hover:bg-gray-300">
                      <FaTrashAlt />{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
