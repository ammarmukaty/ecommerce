import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";
const stripePromise = loadStripe(
  "pk_test_51LmZKeGVhMsoRB2PVaE3rrPb2YZwRBZuSeqjpXrH3SJwWctSj2fsftk100KmgdvCvpxmsOdnFaz8APY9ErpnwBYx00Z0v3HoOW"
);
const PaymentForm = ({
  shippingData,
  checkoutToken,
  prevStep,
  nextStep,
  onCheckoutController,
  timeout,
}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {
          firstname: shippingData.FirstName,
          lastname: shippingData.LastName,
          email: shippingData.Email,
        },
        shipping: {
          name: "primary",
          street: shippingData.address,
          town_city: shippingData.City,
          state: shippingData.ShippingSubDivision,
          postal_code: shippingData.Zip,
          country: shippingData.ShippingCounty,
        },
        fulfillment: { shipping_method: shippingData.ShippingOption },
        payment: {
          gateway: "test_gateway",
          card: {
            number: "4242424242424242",
            expiry_month: "02",
            expiry_year: "24",
            cvc: "123",
            postal_zip_code: "94107",
          },
          stripe: { payment_method_id: paymentMethod.id },
        },
      };

      onCheckoutController(checkoutToken.id, orderData);
      timeout();
      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        PAYMENT METHOD
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={prevStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!stripe}
                >
                  pay {checkoutToken.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
