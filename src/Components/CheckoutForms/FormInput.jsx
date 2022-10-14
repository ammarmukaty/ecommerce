import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";
import "./styles.css";
const FormInput = ({ name, label }) => {
  const { control } = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="field field_v1">
            <label htmlFor={label} className="ha-screen-reader">
              {label}
            </label>
            <input
              value=""
              defaultValue=""
              {...field}
              id={label}
              className="field__input"
              placeholder={label}
            />
            <span className="field__label-wrap" aria-hidden="true">
              <span className="field__label">{label}</span>
            </span>
          </div>
        )}
      />
    </Grid>
  );
};

export default FormInput;
