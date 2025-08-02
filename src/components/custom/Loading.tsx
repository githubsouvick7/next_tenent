import React from "react";

const Loading = () => {
  return (
    <div
      className={`
        fixed inset-0 
        flex flex-col items-center justify-center
        backdrop-blur-sm
        z-50
      `}
    >
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-gray-700 dark:text-gray-200 font-medium">
        loading...
      </p>
    </div>
  );
};

export default Loading;
