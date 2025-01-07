import React, { useContext } from "react";
import orderImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../Store/CartContext";
import UserProgressContext from "../Store/UserProgressContext";
function Header() {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);
  const totalCartItems = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);
  return (
    <header id="main-header">
      <p id="title">
        <img src={orderImg} alt="Food Order Logo" />
        <h1>Food Order App</h1>
      </p>
      <nav >
        <Button textOnly onClick={() => showCart()}>
          Cart({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}

export default Header;
