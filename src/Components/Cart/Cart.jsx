import React from "react";
import { Grid, Typography, Button, Container } from "@material-ui/core";
import useStyles from "./styles";
import CartItems from "./CartItems/CartItems";
import { Link } from "react-router-dom";
const Cart = ({ cart, handleCartUpdateController, handleCartRemoveController, handleCartEmptyController }) => {
  const classes = useStyles();
  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no item in the cart.
      <Link to="/" className={classes.link} color="Secondary">
        try adding some!
      </Link>
    </Typography>
  );
  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItems item={item} handleCartUpdateController={handleCartUpdateController} handleCartRemoveController={handleCartRemoveController} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}></div>
      <Typography variant="h4">
        Subtotal: {cart.subtotal.formatted_with_symbol}
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleCartEmptyController}
          >
            Empty cart
          </Button>
          <Button
            className={classes.checkout}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            component={Link}
            to="/Checkout"
          >
            checkout
          </Button>
        </div>
      </Typography>
    </>
  );
  if (!cart.line_items) return "LOADING...";
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography variant="h3" className={classes.title} gutterBottom>
        Your shopping cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
