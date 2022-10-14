import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CardActions,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";
const Product = ({ product, cartAddHandle }) => {
  const Classes = useStyles();
  return (
    <Card className={Classes.root}>
      <CardMedia
        className={Classes.media}
        image={product.image.url}
        tittle={product.name}
      />
      <CardContent>
        <div className={Classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5">
            {product.price.formatted_with_code}
          </Typography>
        </div>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
        />
      </CardContent>
      <CardActions disableSpacing className={Classes.cardActions}>
        <IconButton
          aria-label="add to cart"
          onClick={() => cartAddHandle(product.id, 1)}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
