import React from "react";
import {
  CardMedia,
  CardActions,
  CardContent,
  Button,
  Card,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";
const CartItems = ({
  item,
  handleCartUpdateController,
  handleCartRemoveController,
}) => {
  const classes = useStyles();
  return (
    <Card>
      <CardMedia
        image={item.image.url}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() =>
              handleCartUpdateController(item.id, item.quantity - 1)
            }
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() =>
              handleCartUpdateController(item.id, item.quantity + 1)
            }
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => handleCartRemoveController(item.id)}
        >
          remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItems;
