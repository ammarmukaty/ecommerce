import React from "react";
import { useState, useEffect } from "react";
import { Products, Navbar, Cart, Checkout } from "./Components";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [order, setOrder] = useState({});
  const fetchProduct = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    const response = await commerce.cart.retrieve();
    setCart(response);
  };

  useEffect(() => {
    fetchProduct();
    fetchCart();
  }, []);
  const handleAddToCart = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setCart(response);
  };
  const handleCartUpdateController = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setCart(response);
  };
  const handleCartRemoveController = async (productId) => {
    const response = await commerce.cart.remove(productId);
    setCart(response);
  };
  const handleCartEmptyController = async () => {
    const response = await commerce.cart.empty();
    setCart(response);
  };
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };
  const handleCheckoutController = async (checkoutTokenID, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenID,
        newOrder
      );

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  return (
    <Router>
      <div>
        <Navbar total_items={cart.total_items} />
        <Routes>
          <Route
            path="/"
            element={
              <Products products={products} cartAddHandle={handleAddToCart} />
            }
          ></Route>
          <Route
            path="/Cart"
            element={
              <Cart
                cart={cart}
                handleCartUpdateController={handleCartUpdateController}
                handleCartRemoveController={handleCartRemoveController}
                handleCartEmptyController={handleCartEmptyController}
              />
            }
          ></Route>
          <Route
            path="/Checkout"
            element={
              <Checkout
                cart={cart}
                onCheckoutController={handleCheckoutController}
                order={order}
                error={errorMessage}
              />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
