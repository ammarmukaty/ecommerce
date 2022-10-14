import {
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const ConformationForm = ({ order, isFinished }) => {
  return order.customer ? (
    <>
      <Typography variant="h5">
        Thank you for your purchase.{order.customer.firstname}{" "}
        {order.customer.lastname}
      </Typography>
      <Divider />
      <Typography variant="subtitle2">
        Order ref:{order.customer_reference}
      </Typography>
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </>
  ) : isFinished ? (
    <>
      <Typography variant="h5">Thank you for your purchase.</Typography>
      <Divider />
      <Typography variant="subtitle2">Order ref:ref</Typography>
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </>
  ) : (
    <div>
      <CircularProgress />
    </div>
  );
};
export default ConformationForm;
