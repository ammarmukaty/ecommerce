import React, { useState, useEffect } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import FormInput from "./FormInput";
import { commerce } from "../../lib/commerce";
import { Link } from "react-router-dom";
const AddressForm = ({ checkoutToken, next }) => {
  const methods = useForm();
  const [ShippingCountries, setShippingCountries] = useState([]);
  const [ShippingCounty, setShippingCounty] = useState("");
  const [ShippingSubDivisions, setShippingSubDivisions] = useState([]);
  const [ShippingSubDivision, setShippingSubDivision] = useState("");
  const [ShippingOptions, setShippingOptions] = useState([]);
  const [ShippingOption, setShippingOption] = useState("");

  const fetchShippingCountries = async (checkoutTokenID) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenID
    );
    setShippingCountries(countries);
    setShippingCounty(Object.keys(countries)[0]);
  };

  const fetchShippingSubDivisions = async (checkoutTokenID) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      checkoutTokenID
    );
    setShippingSubDivisions(subdivisions);
    setShippingSubDivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenID,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenID,
      {
        country,
        region,
      }
    );
    setShippingOptions(options);
    setShippingOption(Object.keys(options)[0]);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (ShippingCounty) fetchShippingSubDivisions(ShippingCounty);
  }, [ShippingCounty]);

  useEffect(() => {
    if (ShippingSubDivision)
      fetchShippingOptions(
        checkoutToken.id,
        ShippingCounty,
        ShippingSubDivision
      );
  }, [ShippingSubDivision]);

  const countries = Object.entries(ShippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subdivisions = Object.entries(ShippingSubDivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const options = ShippingOptions.map((ShippingOption) => ({
    id: ShippingOption.id,
    label: `${ShippingOption.description}-(${ShippingOption.price.formatted_with_symbol})`,
  }));

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              ShippingCounty,
              ShippingSubDivision,
              ShippingOption,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput name="FirstName" label="FirstName" />
            <FormInput name="LastName" label="LastName" />
            <FormInput name="address" label="address" />
            <FormInput name="Email" label="Email" />
            <FormInput name="Zip" label="Zip/postal code" />
            <FormInput name="City" label="City" />

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                defaultValue=" "
                value={ShippingCounty}
                fullWidth
                onChange={(e) => setShippingCounty(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
              <InputLabel>subdivisions</InputLabel>
              <Select
                defaultValue=" "
                value={ShippingSubDivision}
                fullWidth
                onChange={(e) => setShippingSubDivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
              <InputLabel>Shipping options</InputLabel>
              <Select
                defaultValue=" "
                value={ShippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" component={Link} to="/cart">
              BACK TO CART
            </Button>
            <Button variant="contained" type="submit" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
