import React from "react";

const MobileUi = () => {
  return (
    <div className="relative flex justify-center items-center animate-fade-in">
      <div className="relative">
        <div className="relative bg-gray-800 rounded-3xl p-2 shadow-2xl">
          <div className="bg-black rounded-2xl p-1">
            <div className="relative w-[340px] h-[600px] rounded-2xl overflow-hidden bg-gray-900">
              <img
                src="https://pub-07d8598045444efc9676b80f08ab88fe.r2.dev/fimon.souvickchakraborty.me_dashboard(iPhone%20SE)%20(1).png"
                alt="Management Dashboard"
                className="absolute top-0 right-0 w-full h-full object-cover object-left animate-[slide-in-right_2s_ease-out_2s_both]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[slide-in-right_1.5s_ease-out_3.5s_both] skew-x-12"></div>
            </div>
          </div>
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-800 rounded-full"></div>
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full"></div>
        </div>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-black/20 rounded-full blur-lg"></div>
      </div>
    </div>
  );
};

export default MobileUi;
