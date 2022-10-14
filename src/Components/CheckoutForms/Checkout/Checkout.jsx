import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  StepLabel,
  Step,
  Typography,
  CssBaseline,
} from "@material-ui/core";
import useStyles from "./Styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import ConformationForm from "../ConformationForm";
import { commerce } from "../../../lib/commerce";
import { Link } from "react-router-dom";
const Checkout = ({ cart, onCheckoutController, errorMessage, order }) => {
  const steps = ["ShippingAddress", "PaymentDetails"];
  const [activesteps, setActiveSteps] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const GenerateToken = async () => {
      try {
        const Token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(Token);
      } catch (error) {}
    };
    GenerateToken();
  }, [cart]);

  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 30000);
  };

  const nextStep = () => {
    setActiveSteps((prevActiveStep) => prevActiveStep + 1);
  };

  const prevStep = () => {
    setActiveSteps((prevActiveStep) => prevActiveStep - 1);
  };

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Forms = () =>
    activesteps === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        prevStep={prevStep}
        nextStep={nextStep}
        onCheckoutController={onCheckoutController}
        timeout={timeout}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activesteps} className={classes.stepper}>
            {steps.map((eachStep) => (
              <Step key={eachStep}>
                <StepLabel>{eachStep}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activesteps === steps.length ? (
            <ConformationForm order={order} isFinished={isFinished} />
          ) : (
            checkoutToken && <Forms />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
