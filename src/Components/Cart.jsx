import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../Store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../Store/UserProgressContext";
import CartItem from "./CartItem";

function Cart() {
  const { items } = useContext(CartContext);
  const { progress, hideCart,showCheckout } = useContext(UserProgressContext);

  const cartItemsTotal = items.reduce((totalItemPrice, item) => {
    return totalItemPrice + item.quantity * item.price;
  }, 0);

  return (
    <Modal className="cart" open={progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartItemsTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={() => hideCart()}>
          Close
        </Button>
       
        {items.length>0 && <Button onClick={() => showCheckout()} >Go to Check Out</Button>}
      </p>
    </Modal>
  );
}

export default Cart;
