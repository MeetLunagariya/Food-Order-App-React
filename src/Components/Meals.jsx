import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHtttp from "./Hooks/useHtttp";

const requestConfig = {}

function Meals() {
  // const [meals, setMeals] = useState([]);

  // useEffect(() => {
  //   async function getMeals() {
  //     const res = await fetch(`http://localhost:3000/meals`);
  //     const data = await res.json();
  //     setMeals(data);
  //   }
  //   getMeals();
  //   // console.log(meals);
  // }, []);
  const {loading,error,data} = useHtttp(`http://localhost:3000/meals`,requestConfig,[])

  console.log(data)

  if(loading){
    return <p>Loading...</p>
  }
  return (
    <ul id="meals">
      {data.map((item) => (
        <MealItem item={item} key={item.id}/>
      ))}
    </ul>
  );
}

export default Meals;
