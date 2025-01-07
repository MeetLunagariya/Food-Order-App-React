import { createContext } from "react";

const UserProgressContext = createContext({
  progress: "", //'cart', 'Checkout'
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

export default UserProgressContext;

import React from "react";

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = React.useState("");

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }

  function showCheckout() {
    setUserProgress("checkout");
  }

  function hideCheckout() {
    setUserProgress("");
  }

  const userProgressCtx = {
    progress:userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };  

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}
