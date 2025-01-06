import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";

function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function getMeals() {
      const res = await fetch(`http://localhost:3000/meals`);
      const data = await res.json();
      setMeals(data);
    }
    getMeals();
    // console.log(meals);
  }, []);

  return (
    <ul id="meals">
      {meals.map((item) => (
        <MealItem item={item} key={item.id}/>
      ))}
    </ul>
  );
}

export default Meals;
