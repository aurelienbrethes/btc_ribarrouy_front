import React from "react";

const CustomButton = ({ children }) => (
  <div
    onClick={onclick}
    className="px-6 py-4 mx-4 my-3 text-center border rounded cursor-pointer bg-zinc-300"
  >
    {children}
  </div>
);

export default CustomButton;
