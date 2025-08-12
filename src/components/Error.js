import React from "react";

const ErrorMessage = function ErrorMessage({ message }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-500 text-lg font-semibold">{message}</div>
    </div>
  );
};

export default ErrorMessage;
