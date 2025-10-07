import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavContext } from "../context/NavContext";

const Header = () => {
    let [searchParams] = useSearchParams();
    const [project, setProject] = useState("NORWICH PORTLAND JAMAICA");
    const { state } = useNavContext();
    const { view } = state;
    useEffect(() => {
        const projectName = searchParams.get("project");
        const extent = searchParams.get("extent");
        if (projectName) {
            setProject(projectName);
        } else {
            setProject("NORWICH PORTLAND JAMAICA");
        }
        if (extent) {
            const extentArray = JSON.parse(extent);
            if (view) {
                console.log("view", view);
                view.when(() => {
                    view.goTo(
                        {
                            center: extentArray,
                            zoom: 18,
                        },
                        {
                            duration: 2000,
                            easing: "ease-in-out",
                        }
                    );
                });
            }
        }
    }, [searchParams, view]);
    return (
        <div className="w-full h-fit p-0 bg-slate-800 border-l-1 border-gray-600">
            {/* container */}
            <div className="flex items-center justify-between px-6">
                <div className="w-12 h-12 object-cover">
                    {/* <img className="w-full h-full" src="./logo.png" alt="" /> */}
                </div>
                <h1 className="text-white text-xl cursor-pointer hover:translate-x-0.5 hover:text-blue-300 trans">
                    {project}
                </h1>
                <div className=""></div>
            </div>
        </div>
    );
};

export default Header;
