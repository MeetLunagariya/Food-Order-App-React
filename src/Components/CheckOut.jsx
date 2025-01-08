import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../Store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./Input";
import Button from "./UI/Button";
import UserProgressContext from "../Store/UserProgressContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useHtttp from "./Hooks/useHtttp";
import Error from "./Error";

const schema = yup.object({
  name: yup.string().trim().required("Full Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  street: yup.string().trim().required("Street is required"),
  postal_code: yup
    .string()
    .required("Postal Code is required")
    .matches(/^\d{5}$/, "Postal Code must be exactly 5 digits"),
  city: yup.string().required("City is required"),
});

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
function CheckOut() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });
  const { data, loading, error, sendRequest } = useHtttp(
    `http://localhost:3000/orders`,
    requestConfig
  );
  const { items, clearCart } = useContext(CartContext);
  const { hideCheckout, progress } = useContext(UserProgressContext);
  const cartItemsTotal = items.reduce((totalItemPrice, item) => {
    return totalItemPrice + item.quantity * item.price;
  }, 0);

  const onSubmit = async (data) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    console.log(data);
    // Here you can make a POST request to your backend to save the opinion
    sendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: data,
        },
      })
    );

    clearCart();
  };

  function handleCloseCart() {
    hideCheckout();
  }

  let action = (
    <>
      <Button onClick={handleCloseCart} type="button" textOnly>
        Close
      </Button>

      <Button disabled={isSubmitting}>Submit Order</Button>
    </>
  );

  if (loading) {
    action = <span>Sending order Data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleCloseCart}>
        <h2>Success!</h2>
        <p>Your order has submitted Successfully.</p>
        <p>Check your mail for order details...</p>
        <p className="modal-actions">
          <Button onClick={() => (handleCloseCart)}>
            Got it!
          </Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === "checkout"} onClose={handleCloseCart}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Checkout</h2>
        <p>Total Amount : {currencyFormatter.format(cartItemsTotal)}</p>

        <Input label="Full Name" type="text" id="name" {...register("name")} />
        {errors.name && <span className="errors">{errors.name?.message}</span>}

        <Input
          label="E-mail Address"
          type="email"
          id="email"
          {...register("email")}
        />
        {errors.email && (
          <span className="errors">{errors.email?.message}</span>
        )}

        <Input label="Street" type="text" id="street" {...register("street")} />
        {errors.street && (
          <span className="errors">{errors.street?.message}</span>
        )}

        <div className="control-row">
          <Input
            label="Postal Code"
            type="text"
            id="postal_code"
            {...register("postal_code")}
          />
          {errors.postal_code && (
            <span className="errors">{errors.postal_code?.message}</span>
          )}

          <Input label="City" type="text" id="city" {...register("city")} />
          {errors.city && (
            <span className="errors">{errors.city?.message}</span>
          )}
        </div>

        {error && <Error title={"Failed to submit order."} message={error} />}
        <p className="modal-actions">{action}</p>
      </form>
    </Modal>
  );
}

export default CheckOut;
