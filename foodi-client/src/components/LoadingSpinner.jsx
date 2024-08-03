import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="spinner-border animate-spin inline-block w-100 h-100 border-4 rounded-full text-green-600" role="status">
        <span className="visually-hidden text-black">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;