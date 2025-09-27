import React, { useEffect, useRef } from "react";
import { useNavContext } from "../../../../context/NavContext";
import FeatureTable from "@arcgis/core/widgets/FeatureTable.js";
const AttributeTableContent = () => {
    const AttributeContainer = useRef();
    const { state } = useNavContext();
    const { view, selectedLayer } = state;
    useEffect(() => {
        if (!view || !AttributeContainer.current || !selectedLayer) return;
        const featureTable = new FeatureTable({
            view: view,
            layer: selectedLayer,
            container: AttributeContainer.current,
        });
        return () => {
            if (AttributeContainer.current) {
                featureTable.destroy();
                AttributeContainer.current = null;
            }
        };
    }, [view, selectedLayer]);
    return (
        <div
            className="w-full h-full overflow-auto py-2"
            ref={AttributeContainer}
        ></div>
    );
};

export default AttributeTableContent;
