import React, { useContext } from "react";
import CartContext from "../Store/CartContext";
import { currencyFormatter } from "../util/formatting";


function CartItem({ item }) {
  const {addItem,removeItem} = useContext(CartContext)
  
  return (
    <li key={item.id} className="cart-item">
      <p>
      {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={()=>removeItem(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={()=>addItem(item)}>+</button>
      </p>
    </li>
  );
}

export default CartItem;
