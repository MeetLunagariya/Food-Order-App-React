import React from "react";
import orderImg from "../assets/logo.jpg";
import Button from "./UI/Button";
function Header() {
  return (
    <header id="main-header">
      <p id="title">
        <img src={orderImg} alt="Food Order Logo" />
        <h1>Food Order App</h1>
      </p>
      <Button textOnly>Cart(0)</Button>
    </header>
  );
}

export default Header;
