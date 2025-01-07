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
    <div>CheckOut</div>
  )
}

export default CheckOut;
