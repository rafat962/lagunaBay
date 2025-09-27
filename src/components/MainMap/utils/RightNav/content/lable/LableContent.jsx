import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";

import { useNavContext } from "../../../../context/NavContext";
const LableContent = () => {
    let [attr, serAttr] = useState([]);
    const { state } = useNavContext();
    const { selectedLayer } = state;
    useEffect(() => {
        if (!selectedLayer) return;
        const fieldInfo = selectedLayer.fields.map((field) => ({
            name: field.name,
            type:
                field.type === "string"
                    ? "text"
                    : field.type === "date"
                      ? "date"
                      : "number",
        }));
        serAttr(fieldInfo);
    }, [selectedLayer]);
    const { control, watch } = useForm({
        defaultValues: {
            field: "None",
        },
    });
    const fieldInput = watch("field");
    useEffect(() => {
        if (!fieldInput) return;
    }, [fieldInput]);

    return (
        <form className="mb-2 flex flex-col hide-scrollbar items-center justify-start w-full h-full px-3 py-4 overflow-auto">
            {/* select field */}
            <Controller
                rules={{ required: true }}
                name="field"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        className="w-full text-right"
                        id="standard-basic"
                        select
                        label="Select Attribute"
                        variant="standard"
                    >
                        <MenuItem key="8" value="None">
                            None
                        </MenuItem>
                        {attr.map((item) => (
                            <MenuItem key={item.name} value={item.name}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />
        </form>
    );
};

export default LableContent;
