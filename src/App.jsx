import Cart from "./Components/Cart";
import CheckOut from "./Components/CheckOut";
import Header from "./Components/Header";
import Meals from "./Components/Meals";
import { CartContextProvider } from "./Store/CartContext";
import { UserProgressContextProvider } from "./Store/UserProgressContext";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart/>
        <CheckOut/>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
