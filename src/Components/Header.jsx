import React, { useContext } from "react";
import orderImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../Store/CartContext";
function Header() {
  const { items } = useContext(CartContext);

  return (
    <header id="main-header">
      <p id="title">
        <img src={orderImg} alt="Food Order Logo" />
        <h1>Food Order App</h1>
      </p>
      <Button textOnly>
        Cart(
        {items.reduce((totalNumberOfItems, item) => {
          return totalNumberOfItems + item.quantity;
        }, 0)}
        )
      </Button>
    </header>
  );
}

export default Header;
