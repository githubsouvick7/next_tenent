import React from "react";

const TabletMockup = () => {
  return (
    <div className="relative flex justify-center items-center animate-fade-in">
      {/* Tablet Frame */}
      <div className="relative">
        {/* Tablet Screen */}
        <div className="relative bg-gray-800 rounded-2xl p-3 shadow-2xl">
          {/* Screen Bezel */}
          <div className="bg-black rounded-xl p-2">
            {/* Dashboard Container with 50% reveal effect INSIDE the screen */}
            <div className="relative w-[520px] h-[820px] rounded-xl overflow-hidden bg-gray-900">
              {/* Dashboard Image - positioned to show right 50% */}
              <img
                src="/lovable-uploads/d38ae3f3-c81e-4e4e-9111-8e5bf3fd6399.png"
                alt="Management Dashboard"
                className="absolute top-0 right-0 w-full h-full object-cover object-left animate-[slide-in-right_2s_ease-out_1.5s_both]"
                style={{
                  left: "50%",
                }}
              />

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[slide-in-right_1.5s_ease-out_3s_both] skew-x-12"></div>
            </div>
          </div>

          {/* Home button */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-700 rounded-full border-2 border-gray-600"></div>
        </div>

        {/* Tablet Shadow */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-full h-6 bg-black/20 rounded-full blur-xl scale-110"></div>
      </div>
    </div>
  );
};

export default TabletMockup;
