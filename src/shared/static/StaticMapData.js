import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
// -------------------------------------------------------------------------------------done
const Parcels = new FeatureLayer({
    portalItem: {
        id: "125a1682138640188dfec580078866e9", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
    title: "Parcels",
    labelingInfo: [
        {
            labelExpressionInfo: { expression: "$feature.Lot_NUM" }, // غيّر NAME للفيلد بتاعك
            symbol: {
                type: "text",
                color: "black",
                haloSize: 1,
                haloColor: "white",
                font: {
                    size: 10,
                    family: "Arial",
                },
            },
            // أهم حاجة هنا 👇
            labelPlacement: "always-horizontal",
            deconflictionStrategy: "none", // ده يخليها تظهر كلها حتى لو متزاحمة
        },
    ],
    labelsVisible: true,
    popupEnabled: true,
});
//https://services6.arcgis.com/fQifnPoW5pW1OhuM/ArcGIS/rest/services/Parcels_new/FeatureServer
// -------------------------------------------------------------------------------------done
const dry_gully = new FeatureLayer({
    portalItem: {
        id: "9e5c1cc2f81a4af082d6c268cd8f323d", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
// -------------------------------------------------------------------------------------done
const proposed_Water = new FeatureLayer({
    portalItem: {
        id: "53f3fbf82cf84391bdc682f3b9ccf7ce", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
// -------------------------------------------------------------------------------------done
const NWC = new FeatureLayer({
    portalItem: {
        id: "7886fd752f10498898a03f6377a131de", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});

// -------------------------------------------------------------------------------------done

const detention_pond = new FeatureLayer({
    portalItem: {
        id: "f106f123994543d09311a0d345d6f2a6", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
// -------------------------------------------------------------------------------------done
const Future_Development = new FeatureLayer({
    portalItem: {
        id: "32008b0847e2450fbab337fff27465d2", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
// -------------------------------------------------------------------------------------done
const roads = new FeatureLayer({
    portalItem: {
        id: "bea41907076d4540982324d5f3e43dfc", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
// -------------------------------------------------------------------------------------done
const open_area = new FeatureLayer({
    portalItem: {
        id: "c7636e5ff9bf4602943a1fc59b73e66d", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
// -------------------------------------------------------------------------------------done
const treatment_plant = new FeatureLayer({
    portalItem: {
        id: "69646249a3824b41ba1888ac089c9de9", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
// -------------------------------------------------------------------------------------done
const cluster = new FeatureLayer({
    portalItem: {
        id: "1daf43fb4f5f42199375c30588650191", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
    title: "cluster",
});
// -------------------------------------------------------------------------------------done
const sewer = new FeatureLayer({
    portalItem: {
        id: "609cde122c9742f0bf38d5c8d0541d20", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
// -------------------------------------------------------------------------------------done
const Proposed_streetLight = new FeatureLayer({
    portalItem: {
        id: "eb6755773d384b5e9ca361e081d95917", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
// -------------------------------------------------------------------------------------done
const Proposed_pools = new FeatureLayer({
    portalItem: {
        id: "392d4aec12e040a9a735625985149657", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const center = [-76.475188, 18.191876];
const zoom = 18;

export {
    center,
    zoom,
    Parcels,
    dry_gully,
    Future_Development,
    detention_pond,
    roads,
    open_area,
    NWC,
    treatment_plant,
    cluster,
    sewer,
    proposed_Water,
    Proposed_streetLight,
    Proposed_pools,
};
