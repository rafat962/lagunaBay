/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import { Controller, useForm } from "react-hook-form";
import { Button, MenuItem, TextField } from "@mui/material";
import { HiMiniArrowUturnLeft, HiMiniCubeTransparent } from "react-icons/hi2";
import toast from "react-hot-toast";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import { useNavContext } from "../../../../context/NavContext";
import { hexToRGBA } from "../../../../../../shared/helpers/DateConvintion";
const BufferContent = () => {
    const { state } = useNavContext();
    const { view, selectedLayer } = state;

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            distance: 1,
            unit: "meters",
            color: "#518485",
        },
    });
    const [bufferGraphicsLayer, setBufferGraphicsLayer] = useState(
        new GraphicsLayer()
    );
    async function onSubmit(data) {
        const { distance, unit, color } = data;
        if (Number.isNaN(distance)) {
            toast.error("يجب عليك إدخال المسافة");
            return;
        }
        // ---------------- Buffer Logic  ----------------
        view?.map?.add(bufferGraphicsLayer); // Only add it once
        const query = selectedLayer.createQuery();
        query.where = "1=1";
        query.returnGeometry = true;
        const { features } = await selectedLayer.queryFeatures(query);
        if (features.length === 0) {
            toast.error("لا توجد معالم لتطبيق Buffer عليها");
            return;
        }
        // bufferGraphicsLayer.removeAll();
        features.forEach((feature) => {
            if (feature.geometry) {
                let buffered = geometryEngine.buffer(
                    feature.geometry,
                    distance,
                    unit
                );
                const bufferGraphic = new Graphic({
                    geometry: buffered,
                    symbol: {
                        type: "simple-fill",
                        color: hexToRGBA(color, 0.2), // blue with transparency
                        outline: {
                            color: hexToRGBA(color, 0.2),
                            width: 2,
                        },
                    },
                });
                // Add to graphics layer
                bufferGraphicsLayer?.add(bufferGraphic);
            }
        });
    }
    function onError(error) {
        if (error.distance && error.unit) {
            toast.error("يجب عليك إدخال الواحدة و المسافة");
        } else if (error.distance) {
            toast.error("يجب عليك إدخال المسافة");
        } else if (error.unit) {
            toast.error("يجب عليك إدخال الوحدة");
        }
    }
    function resetBuffer() {
        if (bufferGraphicsLayer) {
            bufferGraphicsLayer.removeAll();
        }
        reset();
    }
    return (
        <form
            className="w-full py-1 px-3  h-full"
            onSubmit={handleSubmit(onSubmit, onError)}
        >
            {/* DISTANCE */}
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                    <TextField
                        value={field.value ?? 1}
                        {...field}
                        onChange={(e) => {
                            field.onChange(e.target.valueAsNumber); // 👈 converts to number
                        }}
                        type="number"
                        className="w-full"
                        label="Distance"
                        variant="standard"
                        color={errors.distance && "error"}
                        inputProps={{
                            inputMode: "numeric", // Shows numeric keyboard on mobile
                            pattern: "[0-9]*", // Limits input to digits only
                        }}
                    />
                )}
                name="distance"
            />
            <br />
            <br />
            {/* unit */}
            <Controller
                rules={{ required: true }}
                control={control}
                name="unit"
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="w-full"
                        id="standard-multiline-flexible"
                        label="Unit"
                        select
                        variant="standard"
                    >
                        <MenuItem value="meters">meters</MenuItem>
                        <MenuItem value="feet">feet</MenuItem>
                        <MenuItem value="kilometers">kilometers</MenuItem>
                        <MenuItem value="miles">miles</MenuItem>
                        <MenuItem value="nautical-miles">
                            nautical-miles
                        </MenuItem>
                        <MenuItem value="miles">miles</MenuItem>
                        <MenuItem value="miles">miles</MenuItem>
                    </TextField>
                )}
            />
            <br />
            <br />
            {/* color */}
            <Controller
                rules={{ required: true }}
                control={control}
                name="color"
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="w-full"
                        id="standard-multiline-flexible"
                        label="Color"
                        type="color"
                        variant="standard"
                    />
                )}
            />
            {/* Submit and reset */}
            <br />
            <br />
            {/* actions */}
            <div className="flex items-center justify-center space-x-4 w-full">
                <Button
                    sx={{
                        margin: "2px",
                    }}
                    startIcon={<HiMiniCubeTransparent />}
                    type="submit"
                    className="w-full"
                    variant="contained"
                >
                    Buffer
                </Button>
                <Button
                    sx={{
                        margin: "2px",
                    }}
                    startIcon={<HiMiniArrowUturnLeft />}
                    type="button"
                    onClick={resetBuffer}
                    className="w-full"
                    variant="contained"
                    color="error"
                >
                    Reset
                </Button>
            </div>
        </form>
    );
};

export default BufferContent;
