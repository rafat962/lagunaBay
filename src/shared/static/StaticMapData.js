import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

const Parcels = new FeatureLayer({
    portalItem: {
        id: "e15334656bbf48329676f3f3bab4f40d", // Your portal item ID
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
});
//https://services6.arcgis.com/fQifnPoW5pW1OhuM/ArcGIS/rest/services/Parcels_new/FeatureServer

const dry_gully = new FeatureLayer({
    portalItem: {
        id: "95be718615d643e8befdeae156c5b526", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const NWC = new FeatureLayer({
    portalItem: {
        id: "cf72e81e25114fe9b9b91b7409982aac", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const detention_pond = new FeatureLayer({
    portalItem: {
        id: "b17d3a741f06417bb8ff4a9fa463323f", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const Future_Development = new FeatureLayer({
    portalItem: {
        id: "7840b12a0ef846bb86e416c7e1e301e1", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const roads = new FeatureLayer({
    portalItem: {
        id: "9da4225966dc47f59ca025b130719455", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const open_area = new FeatureLayer({
    portalItem: {
        id: "1bd43e856b254b508d07752260642262", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const treatment_plant = new FeatureLayer({
    portalItem: {
        id: "75c897a3caaf40de8d63fe8b63d45b56", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const cluster = new FeatureLayer({
    portalItem: {
        id: "1daf43fb4f5f42199375c30588650191", // Your portal item ID
    },
    outFields: ["*"], // Ensure all fields are available
});
const sewer = new FeatureLayer({
    portalItem: {
        id: "609cde122c9742f0bf38d5c8d0541d20", // Your portal item ID
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
};
