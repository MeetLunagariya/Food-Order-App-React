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

function CheckOut() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const { items } = useContext(CartContext);
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

    fetch(`http://localhost:3000/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items:items,
          customer: data,
        },
      }),
    });
  };

  function handleCloseCart() {
    hideCheckout();
  }

  return (
    <Modal open={progress === "checkout"} onClose={handleCloseCart}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Checkout</h2>
        <p>Total Amount : {currencyFormatter.format(cartItemsTotal)}</p>

        <Input
          label="Full Name"
          type="text"
          id="name"
          {...register("name")}
        />
        {errors.name && (
          <span className="errors">{errors.name?.message}</span>
        )}

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

        <p className="modal-actions">
          <Button onClick={handleCloseCart} type="button" textOnly>
            Close
          </Button>

          <Button
           
            disabled={isSubmitting}
          >
            Submit Order
          </Button>
        </p>
      </form>
    </Modal>
  );
}

export default CheckOut;
