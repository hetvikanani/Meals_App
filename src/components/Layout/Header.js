import React from "react";
import mealsImage from "../../assests/meals.jpg";
import MealsSummary from "../Meals/MealsSummary";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return (
        <>
            <header className={classes.header}>
                <h1>My Meals</h1>
                <HeaderCartButton onShowCart={props.onShowCart} />
            </header>
            <div className={classes[`main-image`]}>
                <img src={mealsImage} />
            </div>
        </>
    );
};

export default Header;
