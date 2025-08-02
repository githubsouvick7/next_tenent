import Image from "next/image";
import React from "react";

const LaptopUi = () => {
  return (
    <div className="w-full max-w-[100%] sm:max-w-[90%] md:max-w-[85%] lg:min-w-[800px]">
      <div className="relative bg-gray-800 rounded-t-xl p-2 shadow-2xl">
        <div className="bg-black rounded-lg p-1">
          {/* <div className="relative w-full h-60 sm:h-80 md:h-[550px] rounded-lg overflow-hidden bg-gray-900"> */}
          <Image
            height={1020}
            width={1400}
            src="https://pub-07d8598045444efc9676b80f08ab88fe.r2.dev/Screenshot%202025-05-26%20003455.png"
            alt="Management Dashboard"
            // className="absolute top-0 right-0 w-full h-full object-cover animate-[slide-in-right_2s_ease-out_1s_both]"
            className="relative w-full lg:w-[1400] md:w-[1300] xl:w-[1500] h-60 sm:h-80 md:h-[600px] rounded-lg overflow-hidden bg-gray-900"
          />
          {/* </div> */}
        </div>
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full"></div>
      </div>
      <div className="bg-gray-300 h-6 sm:h-8 rounded-b-xl shadow-lg relative">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400"></div>
      </div>
      {/* <div className="mt-4 w-full h-8 bg-black/20 rounded-full blur-xl scale-110 mx-auto"></div> */}
    </div>
  );
};

export default LaptopUi;
