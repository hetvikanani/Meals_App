import React, { useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import axios from "axios";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const result = await axios.get(
          `https://meal-f06cc-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json`
        );

        const z = Object.keys(result.data);
        const loadedMeals = z.map((ele) => {
          const t = result.data[ele];
          t.id = ele;
          return t;
        });

        setMeals(loadedMeals);
        if (loadedMeals.length > 0) {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };
    fetchMeals();
  }, []);

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  // if (isLoading) {
  //     return (
  //         <section className={classes.MealsLoading}>
  //             <p>Loading...</p>
  //         </section>s
  //     )
  // }

  return (
    <section className={classes.meals}>
      {isLoading && (
        <section className={classes.MealsLoading}>
          <p>Loading...</p>
        </section>
      )}
      {!isLoading && (
        <Card>
          <ul>
            {meals.map((ele) => {
              return (
                <MealItem
                  key={Math.random()}
                  id={ele.id}
                  name={ele.name}
                  price={ele.price}
                  description={ele.description}
                />
              );
            })}
          </ul>
        </Card>
      )}
    </section>
  );
};

export default AvailableMeals;
