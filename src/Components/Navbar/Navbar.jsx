import React from "react";
import {
  AppBar,
  Toolbar,
  Badge,
  MenuItem,
  Menu,
  Typography,
  IconButton,
} from "@material-ui/core";
import logo from "../../assets/commerce.png";
import useStyles from "./styles";
import { AddShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
const Navbar = ({ total_items }) => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <AppBar position="fixed" className={classes.appBar} color="inherit">
      <Toolbar>
        <Typography
          variant="h6"
          className={classes.tlttle}
          color="inherit"
          component={Link}
          to="/"
        >
          <img
            src={logo}
            alt="commerce logo"
            className={classes.image}
            height="26px"
          />
        </Typography>
        <div className={classes.grow} />
        {location.pathname === "/" && (
          <div className={classes.button}>
            <IconButton
              component={Link}
              to="/Cart"
              aria-label="Cart items"
              color="inherit"
            >
              <Badge
                badgeContent={total_items}
                color="secondary"
                overlap="rectangular"
              >
                <AddShoppingCart />
              </Badge>
            </IconButton>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
