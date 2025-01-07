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
  full_name: yup.string().trim().required("Full Name is required"),
  e_mail: yup
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
  };

  return (
    <Modal open={progress === "checkout"}>
      <form>
        <h2>Checkout</h2>
        <p>Total Amount : {currencyFormatter.format(cartItemsTotal)}</p>

        <Input
          label="Full Name"
          type="text"
          id="full-name"
          {...register("full_name")}
        />
        {errors.full_name && (
          <span className="errors">{errors.full_name?.message}</span>
        )}
        <Input
          label="E-mail Address"
          type="email"
          id="e-mail"
          {...register("e_mail")}
        />
        {errors.e_mail && (
          <span className="errors">{errors.e_mail?.message}</span>
        )}
        <Input label="Street" type="text" id="street" {...register("street")} />
        {errors.street && (
          <span className="errors">{errors.street?.message}</span>
        )}

        <div className="control-row">
          <Input
            label="Postal Code"
            type="text"
            id="postal-code"
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
          <Button onClick={() => hideCheckout()} type="button" textOnly>
            Close
          </Button>
          <Button type="button" onClick={handleSubmit(onSubmit)}>
            Submit Order
          </Button>
        </p>
      </form>
    </Modal>
  );
}

export default CheckOut;
