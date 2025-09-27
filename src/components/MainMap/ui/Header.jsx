import React from "react";

const Header = () => {
    return (
        <div className="w-full h-fit p-0 bg-slate-800 border-l-1 border-gray-600">
            {/* container */}
            <div className="flex items-center justify-between px-6">
                <div className="w-12 h-12 object-cover">
                    <img className="w-full h-full" src="./logo.png" alt="" />
                </div>
                <h1 className="text-white text-xl cursor-pointer hover:translate-x-0.5 hover:text-blue-300 trans">
                    LAGUNA BAY
                </h1>
                <div className=""></div>
            </div>
        </div>
    );
};

export default Header;
