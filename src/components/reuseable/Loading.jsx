import React from "react";

const Loading = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-black opacity-75 absolute top-0 left-0 flex justify-center items-center z-50">
      <div className="w-1/2 h-1/2 absolute flex justify-center items-center">
        <div className="border-dashed border-4 border-white rounded-full w-15 h-15 animate-ping flex justify-center items-center">
          <div className="border-dashed border-4 border-[#4A69E2] rounded-full w-10 h-10 animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

