import React, { useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import axios from "axios";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMeals = async () => {
            const result = await axios.get(
                `https://meal-f06cc-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json`
            );
            const loadedMeals = Object.values(result.data);

            setMeals(loadedMeals);
            if (loadedMeals.length > 0) {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 1000);
            }
        };
        try {
            fetchMeals();
        } catch (error) {
            console.log(error);
        }
    }, []);

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
