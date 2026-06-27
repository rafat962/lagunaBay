/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
    BiBookBookmark,
    BiCog,
    BiGridAlt,
    BiInfoCircle,
    BiLayer,
    BiLayerPlus,
    BiListUl,
    BiShareAlt,
} from "react-icons/bi";
import { Tooltip } from "@mui/material";
import NavItem from "./utils/NavItem";
import { useNavContext } from "../../context/NavContext";
import LayersContent from "./utils/sideContent/LayersContent";
import BasemapContent from "./utils/sideContent/BasemapContent";
import LegendContent from "./utils/sideContent/LegendContent";
import BookMarkContent from "./utils/sideContent/BookMarkContent";
import ShareDialog from "./utils/sideContent/ShareDialog";
import Expand from "../../../../shared/ui/header/utils/Expand";
import RightNav from "../RightNav/RightNav";
import AddLayersContent from "./utils/sideContent/AddLayersContent";
import { useSearchParams } from "react-router-dom";
import { HiSquare3Stack3D } from "react-icons/hi2";
const LeftNav = () => {
    const { dispatch, state } = useNavContext();
    const { layers, BaseMap, legend, bookMark, addLayer, DMap } = state;
    // ---- dialog
    const [open, setOpen] = React.useState(false);
    const [searchParams, SetSearchParams] = useSearchParams();
    const [permissions, setPermissions] = useState([]);
    const [Project, setProject] = useState([]);
    useEffect(() => {
        setPermissions(searchParams.get("gIjxYweHWxrC1"));
        setProject(searchParams.get("project"));
    }, []);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-between">
            {/* main container */}
            <ul className="w-full h-full flex flex-col items-center justify-start  py-2">
                {/* Add Layers */}
                {(permissions?.includes("T8g4K9zQa") ||
                    permissions?.includes("XxBn9Q9@NaIJ7Gps")) && (
                    <NavItem
                        name="Add Layers"
                        icon={<BiLayerPlus />}
                        onClick={() => dispatch({ type: "addLayer" })}
                        state={addLayer}
                        content={<AddLayersContent />}
                        dispatch={dispatch}
                    />
                )}
                {/* Layers */}
                <NavItem
                    name="Layers"
                    icon={<BiLayer />}
                    onClick={() => dispatch({ type: "layers" })}
                    state={layers}
                    content={<LayersContent />}
                    dispatch={dispatch}
                />
                {/* Basemap */}
                <NavItem
                    name="BaseMap"
                    icon={<BiGridAlt />}
                    onClick={() => dispatch({ type: "BaseMap" })}
                    state={BaseMap}
                    content={<BasemapContent />}
                    dispatch={dispatch}
                />
                {/* Legend */}
                <NavItem
                    name="Legend"
                    icon={<BiListUl />}
                    onClick={() => dispatch({ type: "legend" })}
                    state={legend}
                    content={<LegendContent />}
                    dispatch={dispatch}
                />
                {/* 3D */}
                {Project == "EcoStead@Norwich" && (
                    <NavItem
                        name="3DMap"
                        icon={<HiSquare3Stack3D />}
                        onClick={() => dispatch({ type: "DMap" })}
                    />
                )}
                {/* BookMark */}
                {/* <NavItem
                    name="BookMark"
                    icon={<BiBookBookmark />}
                    onClick={() => dispatch({ type: "bookMark" })}
                    state={bookMark}
                    content={<BookMarkContent />}
                    dispatch={dispatch}
                /> */}
                {/* Share */}
                {(permissions?.includes("F2qVr8Xpt") ||
                    permissions?.includes("XxBn9Q9@NaIJ7Gps")) && (
                    <NavItem
                        onClick={handleClickOpen}
                        name="Share"
                        icon={<BiShareAlt />}
                        state={false}
                    />
                )}
                {/* share Dialog */}
                <ShareDialog open={open} handleClose={handleClose} />
                {/* righ nav in small screen */}
                <div className="md:hidden">
                    <RightNav smallCase={true} />
                </div>
            </ul>
            {/* bottom */}
            <ul className="w-full  flex flex-col items-center justify-start  pb-2">
                {/* expand */}
                <Tooltip title="Expand" placement="right" arrow>
                    <li
                        className={` flex justify-center items-center text-xl w-full py-4 px-3 cursor-pointer text-gray-400 hover:text-white hover:bg-black  hover:backdrop-opacity-40 trans`}
                    >
                        <Expand />
                    </li>
                </Tooltip>
                {/* <div className="w-8 h-8">
                    <img className="w-full h-full" src="./logo.png" alt="" />
                </div> */}
                {/* Layers */}
                {/* <NavItem name="Info" icon={<BiInfoCircle />} state={false} /> */}
                {/* Basemap */}
                {/* <NavItem name="Settings" icon={<BiCog />} state={false} /> */}
            </ul>
        </div>
    );
};

export default LeftNav;
