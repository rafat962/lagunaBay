import React, { useEffect } from "react";
import { useMap } from "../../../shared/hooks/useMap";
import { useNavContext } from "../context/NavContext";

const MapMain = () => {
    const { viewRef, mapViewModel } = useMap();
    const { dispatch, state } = useNavContext();
    const { DMap } = state;

    // register view once
    useEffect(() => {
        if (mapViewModel && viewRef.current) {
            dispatch({
                type: "view",
                payload: { view: mapViewModel, viewRef },
            });
        }
    }, [mapViewModel]);

    useEffect(() => {
        if (!DMap && mapViewModel) {
            setTimeout(() => {
                mapViewModel.resize();
            }, 100);
        }
    }, [DMap]);

    return (
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
            {/* 2D Map */}
            <div
                ref={viewRef}
                style={{
                    width: "100%",
                    height: "100%",
                    visibility: DMap ? "hidden" : "visible",
                }}
                className="w-100 h-100"
            />

            {/* 3D Map */}
            <iframe
                style={{
                    width: "100%",
                    height: "100%",
                    visibility: DMap ? "visible" : "hidden",
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}
                // src="https://rem.maps.arcgis.com/apps/instant/3dviewer/index.html?appid=0f86e32ed9b94652b3c5b3886f1f4956"
                src="https://rem.maps.arcgis.com/apps/instant/3dviewer/index.html?appid=b889444768234de2a9b6995552dd2723"
                className="w-100 h-100"
            />
        </div>
    );
};

export default MapMain;
