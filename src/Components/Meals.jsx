import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHtttp from "./Hooks/useHtttp";
import Error from "./Error";

const requestConfig = {};

function Meals() {
  const { loading, error, data } = useHtttp(
    `http://localhost:3000/meals`,
    requestConfig,
    []
  );

  console.log(data);

  if (loading) {
    return <p className="center">Loading...</p>;
  }
  if (error) {
    return <Error title="Failed to fetch meals." message={error} />;
  }

  return (
    <ul id="meals">
      {data.map((item) => (
        <MealItem item={item} key={item.id} />
      ))}
    </ul>
  );
}

export default Meals;
